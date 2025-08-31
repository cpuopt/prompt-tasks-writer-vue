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
 * @description 计算一个任务最少出多少张图可以覆盖全部的可能性
 * @param {*} task
 */
const count_task_prompts_num = (task) => {
    let prompts_num = 1;
    if (task.prompts.splice) {
        task.prompts.data
            .filter((prompt_group) => prompt_group.ignore !== true) // 过滤未启用的提示词组
            .forEach((prompt_group) => {
                const prompts = prompt_group.data.filter((prompt) => prompt.ignore != true);
                const choices = prompt_group.choices;
                switch (prompt_group.type) {
                    case 'permutation':
                        prompts_num = prompts_num * StatisticsUtil.permutationNum(choices, prompts.length);
                        break;
                    case 'combination':
                        prompts_num = prompts_num * StatisticsUtil.combinationNum(choices, prompts.length);
                        break;
                }
            });
    } else {
        prompts_num = task.prompts.data.length;
    }

    const uprompts_num = task.uprompts.data.length;
    return prompts_num * uprompts_num;
};
/**
 * @description 生成提示词列表
 * @param {*} tasklist
 * @returns
 */
const generate_promptList = (tasklist) => {
    let TaskpromptGroupList = [];

    tasklist = tasklist.filter((task) => {
        return task.activate == true;
    });

    tasklist.forEach((task) => {
        let promptGroupList = [];

        // 完整正向提示词列表
        let ppromptList = ((prompts) => {
            let li = [];
            let need = task.nums;
            const prompts_random = prompts.random;
            if (prompts.splice) {
                const prompt_groups_tags = [];
                prompts.data
                    .filter((prompt_group) => prompt_group.ignore !== true) // 过滤未启用的提示词组
                    .forEach((prompt_group) => {
                        const prompts = prompt_group.data.filter((prompt) => prompt.ignore != true);
                        const choices = prompt_group.choices;

                        switch (prompt_group.type) {
                            case 'permutation':
                                let permutation_choice_list;
                                if (prompts_random) {
                                    permutation_choice_list = StatisticsUtil.randomNPermutations(deconstructUUIDList(prompts), choices, need);
                                } else {
                                    permutation_choice_list = StatisticsUtil.firstNPermutations(deconstructUUIDList(prompts), choices, need);
                                }
                                for (let index = 0; index < permutation_choice_list.length; index++) {
                                    permutation_choice_list[index] = permutation_choice_list[index].join(',');
                                }
                                prompt_groups_tags.push(permutation_choice_list);
                                break;

                            case 'combination':
                                let combination_choice_list;
                                if (prompts_random) {
                                    combination_choice_list = StatisticsUtil.randomNCombinations(deconstructUUIDList(prompts), choices, need);
                                } else {
                                    combination_choice_list = StatisticsUtil.firstNCombinations(deconstructUUIDList(prompts), choices, need);
                                }
                                for (let index = 0; index < combination_choice_list.length; index++) {
                                    combination_choice_list[index] = combination_choice_list[index].join(',');
                                }
                                prompt_groups_tags.push(combination_choice_list);
                                break;
                        }
                    });
                // 正向提示词随机处理
                if (prompts.random) {
                    StatisticsUtil.randomCartesianProduct(prompt_groups_tags, need).forEach((element) => {
                        li.push(element.join(','));
                    });
                } else {
                    StatisticsUtil.getFirstNCartesianProduct(prompt_groups_tags, need).forEach((element) => {
                        li.push(element.join(','));
                    });
                }
            } else {
                li = deconstructUUIDList(prompts.data);
            }

            return li;
        })(task.prompts);

        // 完整反向提示词列表
        let upromptList = deconstructUUIDList(task.uprompts.data);

        if (task.random) {
            promptGroupList = promptGroupList.concat(StatisticsUtil.randomCartesianProduct([ppromptList, upromptList, [task.size]], task.nums));
            let pex = task.nums - promptGroupList.length;
            if (pex <= 0) {
                promptGroupList = promptGroupList.slice(0, task.nums);
            } else {
                let temp = [];
                for (let index = 0; index < task.nums; index++) {
                    temp.push(randomChild(promptGroupList));
                }
                promptGroupList = temp;
            }
        } else {
            promptGroupList = promptGroupList.concat(StatisticsUtil.getFirstNCartesianProduct([ppromptList, upromptList, [task.size]], task.nums));
            let pex = task.nums - promptGroupList.length;
            if (pex <= 0) {
                promptGroupList = promptGroupList.slice(0, task.nums);
            } else {
                let promptGroupListRaw = promptGroupList.concat();
                let r = Math.floor(pex / promptGroupList.length);
                let p = pex % promptGroupList.length;
                for (let index = 0; index < r; index++) {
                    promptGroupList = promptGroupList.concat(promptGroupListRaw);
                }
                promptGroupList = promptGroupList.concat(promptGroupListRaw.slice(0, p));
            }
        }
        let finpromptGroupList = [];
        promptGroupList.forEach((element) => {
            finpromptGroupList.push({
                prompt: element[0],
                uprompt: element[1],
                character: task.character.data ?? undefined,
                size: element[2]
            });
        });

        TaskpromptGroupList = TaskpromptGroupList.concat(finpromptGroupList);
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
                data: []
            }
        };
    }
    static newCharacter() {
        return {
            uuid: uuidv4(),
            prompts: {
                data: ''
            },
            uprompts: {
                data: ''
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
export { removechild, Debug, insert, generate_promptList, timeFormat, PromptsBuilder, count_task_prompts_num, click_generate };
