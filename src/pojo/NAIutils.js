import { v4 as uuidv4 } from "uuid";

var opInterval = 200;

/**
 * @description 向输入框内覆写内容
 * @param {object} area
 * @param {string} text
 */
var insertText = (area, text) => {
    area.focus();
    document.execCommand("selectAll");
    document.execCommand("delete");
    document.execCommand("insertText", false, text);
    area.blur();
    // area.value = text;
};

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
 * @description 向正向提示词输入框内覆写内容
 * @param {string} prompt
 * @returns
 */
var insertPrompt = async (prompt) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let Prompt_button = document.evaluate("//button[text()='Prompt']", document.body, null, 9, null).singleNodeValue;
            if (Prompt_button != null) {
                Prompt_button.click();
            }
            setTimeout(() => {
                insertText(document.querySelector("textarea[placeholder='Write your prompt here. Use tags to sculpt your outputs.']"), prompt);
                // localStorage.setItem("imagegen-prompt", `"${prompt}"`);
            }, opInterval);

            resolve();
        }, opInterval);
    });
};

/**
 * @description 向反向提示词输入框内覆写内容
 * @param {string} uprompt
 * @returns
 */
var insertUndesiredContent = async (uprompt) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let UndesiredContent_button = document.evaluate("//button[text()='Undesired Content']", document.body, null, 9, null).singleNodeValue;
            if (UndesiredContent_button != null) {
                UndesiredContent_button.click();
            }
            setTimeout(() => {
                insertText(document.querySelector("textarea[placeholder='Write what you want removed from the generation.']"), uprompt);
                // localStorage.setItem("imagegen-negativeprompt", `"${uprompt}"`);
            }, opInterval);

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
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
};
const Debug = (...args) => {
    console.debug(`${new Date().toLocaleDateString("zh-CN", timeFormat)}`, args);
};

/**
 * @description 计算笛卡尔积
 * @param {*} arrays
 * @returns
 */
const cartesianProduct = (arrays) => {
    return arrays.reduce(
        (a, b) => {
            return a
                .map((x) => {
                    return b.map((y) => {
                        return x.concat(y);
                    });
                })
                .reduce((a, b) => {
                    return a.concat(b);
                }, []);
        },
        [[]]
    );
};
const randomChild = (list) => {
    return list[Math.floor(Math.random() * list.length)];
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
class StatisticsUtil {
    static factorial(n) {
        if (0 === n) {
            return 1;
        }
        let res = 1;
        for (let i = 1; i <= n; ++i) {
            res *= i;
        }
        return res;
    }
    static permutationNum(n, m) {
        return this.factorial(m) / this.factorial(m - n);
    }
    static combinationNum(n, m) {
        return this.permutationNum(n, m) / this.permutationNum(n, n);
    }

    static permutations(arr, n) {
        if (n === 1) {
            return arr.map((item) => [item]);
        }

        const result = [];
        for (let i = 0; i < arr.length; i++) {
            const remainingElements = arr.slice(0, i).concat(arr.slice(i + 1));
            const subPermutations = this.permutations(remainingElements, n - 1);
            for (const subPermutation of subPermutations) {
                result.push([arr[i]].concat(subPermutation));
            }
        }

        return result;
    }
    static combinations(arr, n) {
        if (n === 1) {
            return arr.map((item) => [item]);
        }

        const result = [];
        for (let i = 0; i < arr.length - n + 1; i++) {
            const subCombinations = this.combinations(arr.slice(i + 1), n - 1);
            for (const subCombination of subCombinations) {
                result.push([arr[i]].concat(subCombination));
            }
        }

        return result;
    }
}
/**
 * @description 计算一个任务最少出多少张图可以覆盖全部的可能性
 * @param {*} task
 */
const count_task_prompts_num = (task) => {
    let prompts_num = 1;
    if (task.prompts.splice) {
        task.prompts.data.forEach((prompt_group) => {
            switch (prompt_group.type) {
                case "permutation":
                    prompts_num = prompts_num * StatisticsUtil.permutationNum(prompt_group.choices, prompt_group.data.length);
                    break;
                case "combination":
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

    /*  */
    tasklist = tasklist.filter((task) => {
        return task.activate == true;
    });

    tasklist.forEach((task) => {
        let promptGroupList = [];

        // 完整正向提示词列表
        let ppromptList = ((prompts) => {
            let li = [];
            if (prompts.splice) {
                const prompt_groups_tags = [];
                prompts.data.forEach((prompt_group) => {
                    switch (prompt_group.type) {
                        case "permutation":
                            const permutation_choice_list = StatisticsUtil.permutations(deconstructUUIDList(prompt_group.data), prompt_group.choices);
                            for (let index = 0; index < permutation_choice_list.length; index++) {
                                permutation_choice_list[index] = permutation_choice_list[index].join(",");
                            }
                            prompt_groups_tags.push(permutation_choice_list);
                            break;

                        case "combination":
                            const combination_choice_list = StatisticsUtil.combinations(deconstructUUIDList(prompt_group.data), prompt_group.choices);
                            for (let index = 0; index < combination_choice_list.length; index++) {
                                combination_choice_list[index] = combination_choice_list[index].join(",");
                            }
                            prompt_groups_tags.push(combination_choice_list);
                            break;
                    }
                });
                cartesianProduct(prompt_groups_tags).forEach((element) => {
                    li.push(element.join(","));
                });
            } else {
                li = deconstructUUIDList(prompts.data);
            }
            if (prompts.random) {
                li.sort(() => Math.random() - 0.5);
            }
            return li;
        })(task.prompts);

        // 完整反向提示词列表
        let upromptList = deconstructUUIDList(task.uprompts.data);

        if (task.random) {
            for (let index = 0; index < task.nums; index++) {
                promptGroupList.push({ prompt: randomChild(ppromptList), uprompt: randomChild(upromptList) });
            }
        } else {
            cartesianProduct([ppromptList, upromptList]).forEach((element) => {
                promptGroupList.push({ prompt: element[0], uprompt: element[1] });
            });
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
        TaskpromptGroupList = TaskpromptGroupList.concat(promptGroupList);
    });

    Debug(TaskpromptGroupList);
    return TaskpromptGroupList;
};
class PromptsBuilder {
    static newPromptSplice() {
        return { uuid: uuidv4(), data: "" };
    }
    static newPromptGroup() {
        return {
            uuid: uuidv4(),
            data: [PromptsBuilder.newPromptSplice()],
            type: "combination",
            choices: 1,
        };
    }
}
export { Debug, insert, generate_promptList, timeFormat, PromptsBuilder, count_task_prompts_num };
