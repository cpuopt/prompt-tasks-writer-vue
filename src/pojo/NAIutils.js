import { v4 as uuidv4 } from 'uuid';
import { StatisticsUtil } from './StatisticsUtil.ts';
import { insertPrompt, insertUndesiredContent } from './NovelPageUtil.ts';
const opInterval = 100;
/**
 * @description 点击生成按钮
 * @returns
 */
var click_generate = () => {
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
        task.prompts.data.forEach((prompt_group) => {
            switch (prompt_group.type) {
                case 'permutation':
                    prompts_num = prompts_num * StatisticsUtil.permutationNum(prompt_group.choices, prompt_group.data.length);
                    break;
                case 'combination':
                    prompts_num = prompts_num * StatisticsUtil.combinationNum(prompt_group.choices, prompt_group.data.length);
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

            if (prompts.splice) {
                const prompt_groups_tags = [];
                prompts.data.forEach((prompt_group) => {
                    switch (prompt_group.type) {
                        case 'permutation':
                            let permutation_choice_list;
                            if (prompts.random) {
                                permutation_choice_list = StatisticsUtil.randomNPermutations(deconstructUUIDList(prompt_group.data), prompt_group.choices, need);
                            } else {
                                permutation_choice_list = StatisticsUtil.firstNPermutations(deconstructUUIDList(prompt_group.data), prompt_group.choices, need);
                            }
                            for (let index = 0; index < permutation_choice_list.length; index++) {
                                permutation_choice_list[index] = permutation_choice_list[index].join(',');
                            }
                            prompt_groups_tags.push(permutation_choice_list);
                            break;

                        case 'combination':
                            let combination_choice_list;
                            if (prompts.random) {
                                combination_choice_list = StatisticsUtil.randomNCombinations(deconstructUUIDList(prompt_group.data), prompt_group.choices, need);
                            } else {
                                combination_choice_list = StatisticsUtil.firstNCombinations(deconstructUUIDList(prompt_group.data), prompt_group.choices, need);
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
                size: element[2]
            });
        });

        TaskpromptGroupList = TaskpromptGroupList.concat(finpromptGroupList);

        // let rec = {};
        // TaskpromptGroupList.forEach((element) => {
        //     if (element.prompt in rec) {
        //         rec[element.prompt] += 1;
        //     } else {
        //         rec[element.prompt] = 1;
        //     }
        // });
        // console.log("rec:", rec);
    });

    Debug(TaskpromptGroupList);
    return TaskpromptGroupList;
};
class PromptsBuilder {
    static newPromptSplice() {
        return { uuid: uuidv4(), data: '' };
    }
    static newPromptGroup() {
        return {
            uuid: uuidv4(),
            data: [this.newPromptSplice()],
            type: 'combination',
            choices: 1,
            color: 'rgba(255,255,255,0.63)'
        };
    }
    static newTasklist() {
        return {
            cooling: 2,
            realTimeSave: true,
            autoDownloadZIP: false,
            tasks: [this.newTask()]
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
            size: {
                width: 832,
                height: 1216
            },
            prompts: {
                splice: false,
                random: false,
                data: [this.newPromptSplice()]
            },
            uprompts: {
                data: [this.newPromptSplice()]
            }
        };
    }
}
export { removechild, Debug, insert, generate_promptList, timeFormat, PromptsBuilder, count_task_prompts_num };
