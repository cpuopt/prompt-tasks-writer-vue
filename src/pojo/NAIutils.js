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
var insertPrompt = (prompt) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let Prompt_button = document.evaluate("//button[text()='Prompt']", document.body, null, 9, null).singleNodeValue;
            if (Prompt_button != null) {
                Prompt_button.click();
            }
            setTimeout(() => {
                insertText(document.querySelector("textarea[placeholder='Write your prompt here. Use tags to sculpt your outputs.']"), prompt);
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
var insertUndesiredContent = (uprompt) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let UndesiredContent_button = document.evaluate("//button[text()='Undesired Content']", document.body, null, 9, null).singleNodeValue;
            if (UndesiredContent_button != null) {
                UndesiredContent_button.click();
            }
            setTimeout(() => {
                insertText(document.querySelector("textarea[placeholder='Write what you want removed from the generation.']"), uprompt);
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
    timeZone: 'Asia/Shanghai', year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
}
const Debug = (...args) => {

    console.debug(`[${new Date().toLocaleDateString('zh-CN', timeFormat)}]`, args)



}

/**
 * @description 计算笛卡尔积
 * @param {*} arrays 
 * @returns 
 */
const cartesianProduct = (arrays) => {
    return arrays.reduce((a, b) => {
        return a.map((x) => {
            return b.map((y) => {
                return x.concat(y);
            });
        }).reduce((a, b) => {
            return a.concat(b);
        }, []);
    }, [[]]);
}
const randomChild = (list) => {
    return list[Math.floor(Math.random() * list.length)];
}
/**
 * @description 生成提示词列表
 * @param {*} tasklist 
 * @returns 
 */
const generate_promptList = (tasklist) => {
    let TaskpromptGroupList = []

    tasklist.forEach(task => {

        let promptGroupList = []

        // 完整正向提示词列表
        let ppromptList = ((prompts) => {
            let li = []
            if (prompts.splice) {
                cartesianProduct(prompts.data).forEach(element => {
                    li.push(element.join(','))
                });
            } else {
                li = prompts.data
            }
            if (prompts.random) {
                li.sort(() => Math.random() - 0.5);
            }
            return li
        })(task.prompts)

        // 完整反向提示词列表
        let upromptList = task.uprompts.data



        if (task.random) {
            for (let index = 0; index < task.nums; index++) {
                promptGroupList.push({ prompt: randomChild(ppromptList), uprompt: randomChild(upromptList) })
            }
        } else {
            cartesianProduct([ppromptList, upromptList]).forEach(element => {
                promptGroupList.push({ prompt: element[0], uprompt: element[1] })
            })
            let pex = task.nums - promptGroupList.length
            if (pex <= 0) {
                promptGroupList = promptGroupList.slice(0, task.nums)
            } else {
                let promptGroupListRaw = promptGroupList.concat()
                let r = Math.floor(pex / promptGroupList.length)
                let p = pex % promptGroupList.length
                for (let index = 0; index < r; index++) {
                    promptGroupList = promptGroupList.concat(promptGroupListRaw)
                }
                promptGroupList = promptGroupList.concat(promptGroupListRaw.slice(0, p))
            }
        }
        TaskpromptGroupList = TaskpromptGroupList.concat(promptGroupList)
    })

    Debug(TaskpromptGroupList)
    return TaskpromptGroupList
}
export { Debug, insert, generate_promptList, timeFormat }
