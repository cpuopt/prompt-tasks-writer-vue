import { v4 as uuidv4 } from 'uuid';
import { StatisticsUtil } from '@/pojo/StatisticsUtil.ts';
import { insertPrompt, insertUndesiredContent } from '@/pojo/NovelPageUtil.ts';
const opInterval = 100;
/**
 * @description 点击生成按钮
 * @returns
 */
const click_generate = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            document.evaluate("//span[contains(text(),'Generate ') and contains(text(),' Image')]/..", document.body, null, 9, null).singleNodeValue.click();
            resolve();
        }, opInterval);
    });
};

/**
 *
 * @param {string} prompt
 * @param {string} uprompt
 * @param {boolean} generate 是否直接点击生成
 */
async function insert(prompt, uprompt, generate) {
    if (uprompt != null) await insertUndesiredContent(uprompt);
    if (prompt != null) await insertPrompt(prompt);
    if (generate == true) {
        await click_generate();
    }
}

const timeFormat = {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};
const Debug = (...args) => {
    console.debug(`${new Date().toLocaleDateString('zh-CN', timeFormat)}`, args[0]);
};

const randomChild = (list) => {
    const choice = Math.round(Math.random() * (list.length - 1));

    return list[choice];
};
const removechild = (item, container) => {
    const i = container.indexOf(item);
    if (i > -1) {
        container.splice(i, 1);
    }
};
const deconstructUUIDList = (UUIDList) => {
    const result_list = [];

    UUIDList.forEach(({ uuid, data }) => {
        result_list.push(data);
    });
    return result_list;
};

const deconstructDoubleLayerUUIDList = (doubleLayerUUIDList) => {
    const result_list = [];
    doubleLayerUUIDList.forEach(({ uuid, data, type }) => {
        result_list.push(deconstructUUIDList(data));
    });
    return result_list;
};

/**
 * @description 计算一个任务产生多少种全局提示词可能性（角色不影响）
 */
const count_task_prompts_num = (task) => {
    let prompts_num = 1;

    if (task.prompts.splice) {
        task.prompts.data
            .filter(g => !g.ignore)
            .forEach(g => {
                const arr = g.data.filter(i => !i.ignore);
                const k = g.choices;

                if (g.type === "permutation") {
                    prompts_num *= Number(StatisticsUtil.permutationNum(k, arr.length));
                } else {
                    prompts_num *= Number(StatisticsUtil.combinationNum(k, arr.length));
                }
            });
    } else {
        prompts_num = task.prompts.data.length;
    }

    return prompts_num * task.uprompts.data.length;
};


/**
 * @description 计算单个角色的正向提示词总可能数
 * @param {*} charItem  (task.character.data[i])
 */
export const count_character_variants = (charItem) => {
    const groups = charItem.prompts.data.filter(g => !g.ignore);

    let maxCount = 1;

    groups.forEach(group => {
        const arr = group.data.filter(i => !i.ignore);
        const m = arr.length;
        const k = group.choices;

        let count = 1;

        if (group.type === "permutation") {
            count = Number(StatisticsUtil.permutationNum(k, m));
        } else {
            count = Number(StatisticsUtil.combinationNum(k, m));
        }

        // 角色组与组之间拼接，不组合，用最大的作为总数
        if (count > maxCount) maxCount = count;
    });

    return maxCount;
};


/**
 * @description 角色提示词：每个角色生成 N 条正向/反向组合（行对齐）
 * @param {*} task
 * @param {*} need (task.nums)
 */
const generateCharacterVariants = (task, need) => {
    const result = [];

    task.character.data.forEach(charItem => {

        // --- 正向提示词 ---
        const promptGroups = charItem.prompts.data.filter(g => g.ignore !== true);

        const groupsVariants = [];

        promptGroups.forEach(group => {
            const arr = deconstructUUIDList(group.data.filter(i => !i.ignore));
            const k = group.choices;

            let list;

            if (group.type === "permutation") {
                list = charItem.prompts.random
                    ? StatisticsUtil.randomNPermutations(arr, k, need)
                    : StatisticsUtil.firstNPermutations(arr, k, need);
            } else {
                list = charItem.prompts.random
                    ? StatisticsUtil.randomNCombinations(arr, k, need)
                    : StatisticsUtil.firstNCombinations(arr, k, need);
            }

            groupsVariants.push(list.map(x => x.join(",")));
        });

        // --- 将所有组进行拼接（不做组合）---
        const pos = [];
        for (let i = 0; i < need; i++) {
            const line = groupsVariants.map(g => g[i % g.length]).join(",");
            pos.push(line);
        }

        // --- 反向提示词（固定一条） ---
        const negArr = deconstructUUIDList(charItem.uprompts.data.filter(i => !i.ignore));
        const neg = negArr[0] ?? "";

        // --- 存入角色结果 ---
        result.push({
            uuid: charItem.uuid,
            pos,    // N 条
            neg     // 固定一条
        });
    });

    return result;
};


/**
 * @description 生成提示词列表
 * @param {*} tasklist
 * @param {boolean} character 是否启用角色提示词
 * @returns
 */
const generate_promptList = (tasklist, character = false) => {
    let TaskpromptGroupList = [];

    tasklist = tasklist.filter(task => task.activate === true);

    tasklist.forEach(task => {

        const need = task.nums;

        //------------ 全局正向提示词 ------------
        const ppromptList = (() => {
            const prompts = task.prompts;
            let li = [];

            if (prompts.splice) {
                const groups = [];
                prompts.data
                    .filter(g => !g.ignore)
                    .forEach(g => {
                        const arr = deconstructUUIDList(g.data.filter(i => !i.ignore));
                        const k = g.choices;

                        let list;

                        if (g.type === "permutation") {
                            list = prompts.random
                                ? StatisticsUtil.randomNPermutations(arr, k, need)
                                : StatisticsUtil.firstNPermutations(arr, k, need);
                        } else {
                            list = prompts.random
                                ? StatisticsUtil.randomNCombinations(arr, k, need)
                                : StatisticsUtil.firstNCombinations(arr, k, need);
                        }

                        groups.push(list.map(x => x.join(",")));
                    });

                for (let i = 0; i < need; i++) {
                    const line = groups.map(g => g[i % g.length]).join(",");
                    li.push(line);
                }
            } else {
                li = deconstructUUIDList(prompts.data);
            }

            return li;
        })();

        //------------ 全局反向提示词（简单） ------------
        const upromptSrc = deconstructUUIDList(task.uprompts.data);
        const upromptList = [];
        for (let i = 0; i < need; i++) {
            upromptList.push(upromptSrc[i % upromptSrc.length]);
        }

        //------------ 角色提示词（行对齐构造） ------------
        const charVariants = character ? generateCharacterVariants(task, need) : [];

        //------------ 最终拼接（逐行） ------------
        for (let i = 0; i < need; i++) {

            const charactersForThisLine = charVariants.map(cv => {
                return {
                    uuid: cv.uuid,
                    prompts: cv.pos[i],
                    uprompts: cv.neg
                };
            });

            TaskpromptGroupList.push({
                prompt: ppromptList[i],
                uprompt: upromptList[i],
                character: character ? charactersForThisLine : undefined,
                size: task.size
            });
        }
    });

    Debug(TaskpromptGroupList);
    return TaskpromptGroupList;
};


class PromptsBuilder {
    static newPromptSplice() {
        return { uuid: uuidv4(), data: '', ignore: false };
    }
    static addPromptSplice(text) {
        const PromptSplice = this.newPromptSplice();
        PromptSplice.data = text;
        return PromptSplice;
    }
    static newPromptGroup() {
        return {
            uuid: uuidv4(),
            data: [this.newPromptSplice()],
            type: 'combination',
            choices: 1,
            color: 'rgba(255,255,255,0.63)',
            ignore: false
        };
    }
    static newTasklist() {
        return {
            cooling: 2,
            realTimeSave: true,
            autoDownloadZIP: false,
            removeAnmition: false,
            removeRunningAnmition: false,
            blobMemoryRelease: false,
            tasks: [this.newTask()]
        };
    }
    static newSize() {
        return {
            1: {
                width: 832,
                height: 1216
            }
            // 2: {
            //     width: 832,
            //     height: 1216
            // }
        };
    }
    static newAIsettings() {
        return {
            1: {
                Steps: null,
                PromptGuidance: null,
                Variety: null,
                Decrisp: null,
                Seed: null,
                Sampler: null,
                SMEA: null,
                PromptGuidanceRescale: null,
                NoiseSchedule: null
            }
        };
    }
    static newTask() {
        return {
            uuid: uuidv4(),
            title: '',
            activate: true,
            random: false,
            nums: 1,
            fold: false,
            size: this.newSize(),
            AIsettings: this.newAIsettings(),
            prompts: {
                splice: false,
                random: false,
                data: [this.newPromptSplice()]
            },
            uprompts: {
                data: [this.newPromptSplice()]
            },
            character: {
                data: [this.newCharacter()]
            }
        };
    }
    static newCharacter() {
        return {
            uuid: uuidv4(),
            prompts: {
                random: false,
                data: [
                    {
                        uuid: uuidv4(),
                        type: "combination",
                        choices: 1,
                        ignore: false,
                        color: "rgba(255,255,255,0.63)",
                        data: [
                            {
                                uuid: uuidv4(),
                                data: "",
                                ignore: false
                            }
                        ]
                    }
                ]
            },
            uprompts: {
                data: [
                    {
                        uuid: uuidv4(),
                        data: "",
                        ignore: false
                    }
                ]
            }
        };
    }
    static addMissingProperties(obj, template) {
        if (template == null) {
            template = this.newTasklist();
        }
        for (const key in template) {
            if (obj.hasOwnProperty(key)) {
                // 有某个属性

                if (key == 'size') {
                    if (obj.size.hasOwnProperty('width')) {
                        delete obj.size['width'];
                    }
                    if (obj.size.hasOwnProperty('height')) {
                        delete obj.size['height'];
                    }
                }
                if (key == 'tasks') {
                    obj[key].forEach((task) => {
                        this.addMissingProperties(task, this.newTask());
                    });
                } else if (Array.isArray(template[key]) && !Array.isArray(obj[key])) {
                    // console.log(key, '值应当为Array 但目前不是Array 直接覆盖');
                    // 值应当为Array 但目前不是Array 直接覆盖
                    obj[key] = template[key];
                } else if (template[key] !== null && typeof template[key] === 'object' && typeof obj[key] === 'object') {
                    // 值应当为object 且目前是object 递归检测子级属性
                    // console.log(key, '值应当为object 且目前是object 递归检测子级属性');

                    this.addMissingProperties(obj[key], template[key]);
                } else if (typeof template[key] === 'object' && typeof obj[key] !== 'object') {
                    // 值应当为object 且目前不是object 直接覆盖
                    // console.log(key, '值应当为object 且目前不是object 直接覆盖');

                    obj[key] = template[key];
                }
            } else {
                // 无某个属性
                // console.log(key, '无某个属性 直接覆盖');

                obj[key] = template[key];
            }
        }
    }
}

/**
 * 251030 -> 升级
 * @param {*} oldItem 
 * @returns 
 */
export const upgradeCharacterItem = (oldItem) => {
    if (!oldItem || !oldItem.prompts) return oldItem;

    // 已经是新结构 → 跳过
    if (Array.isArray(oldItem.prompts.data)) {
        return oldItem;
    }

    // ---------------- 正向提示（保持整串） ----------------
    const promptString = oldItem.prompts.data || "";

    const newPrompts = {
        random: false,
        data: [
            {
                uuid: uuidv4(),
                type: "combination",
                choices: 1,
                ignore: false,
                color: "rgba(255,255,255,0.63)",
                data: [
                    {
                        uuid: uuidv4(),
                        data: promptString,
                        ignore: false
                    }
                ]
            }
        ]
    };

    // ---------------- 负向提示（保持整串） ----------------
    const upromptString = oldItem.uprompts?.data || "";

    const newUprompts = {
        data: [
            {
                uuid: uuidv4(),
                data: upromptString,
                ignore: false
            }
        ]
    };

    return {
        uuid: oldItem.uuid,
        prompts: newPrompts,
        uprompts: newUprompts
    };
};
export { removechild, Debug, insert, generate_promptList, timeFormat, PromptsBuilder, count_task_prompts_num, click_generate };
