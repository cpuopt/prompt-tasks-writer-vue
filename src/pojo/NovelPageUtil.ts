const opInterval = 100;

// 声明 ReactHTMLInputElement 包括 _valueTracker 属性
interface ReactHTMLInputElement extends HTMLInputElement {
    _valueTracker?: {
        setValue: (value: string) => void;
    };
}

/**
 * @description 设置 React 输入框内容并触发更新
 * @param {ReactHTMLInputElement} el
 * @param {string} value
 * @see https://github.com/facebook/react/issues/11488
 */
const _setReactNativeValue = (el: ReactHTMLInputElement, value: string): void => {
    const previousValue = el.value;

    if (el.type === 'checkbox' || el.type === 'radio') {
        if ((!!value && !el.checked) || (!!!value && el.checked)) {
            el.click();
        }
    } else el.value = value;

    const tracker = el._valueTracker;
    if (tracker) {
        tracker.setValue(previousValue);
    }
    el.dispatchEvent(new Event('change', { bubbles: true }));
};
/**
 * 2025.1.8 适配novelai更新
 * @param el
 * @param value
 */
const __setDivPvalue = (el: HTMLElement, value: string) => {
    el.innerText = value;
    setTimeout(() => {
        el.focus();
        el.blur();
    }, opInterval / 2);
};
/**
 * @description 设置 React textarea 内容并触发更新
 * @param {ReactHTMLInputElement} area
 * @param {string} text
 */
const setReactTextareaNativeValue = (area: ReactHTMLInputElement, text: string): void => {
    _setReactNativeValue(area, text);
};

/**
 * @description 设置 React input 内容并触发更新
 * @param {ReactHTMLInputElement} input
 * @param {string} text
 */
const setReactInputNativeValue = (input: ReactHTMLInputElement, text: string): void => {
    _setReactNativeValue(input, text);
};

/**
 * @description 向正向提示词输入框内覆写内容
 * @param {string} prompt
 * @returns
 */
const insertPrompt = async (prompt: string) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            let Prompt_button = document.evaluate("//button[text()='Prompt']", document.body, null, 9, null).singleNodeValue as HTMLElement | null;
            if (Prompt_button != null) {
                Prompt_button.click();
            }
            setTimeout(() => {
                const target = document.querySelectorAll('div[contenteditable]>p') as NodeListOf<HTMLElement>;
                if (target.length == 2) {
                    __setDivPvalue(document.querySelectorAll('div[contenteditable]>p')[0] as HTMLElement, prompt);
                } else {
                    __setDivPvalue(document.querySelectorAll('div[contenteditable]>p')[0] as HTMLElement, prompt);
                }
                resolve();
            }, opInterval / 2);
        }, opInterval);
    });
};

/**
 * @description 向反向提示词输入框内覆写内容
 * @param {string} uprompt
 * @returns
 */
const insertUndesiredContent = async (uprompt: string) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            let Prompt_button = document.evaluate("//button[text()='Undesired Content']", document.body, null, 9, null).singleNodeValue as HTMLElement | null;
            if (Prompt_button != null) {
                Prompt_button.click();
            }
            setTimeout(() => {
                const target = document.querySelectorAll('div[contenteditable]>p') as NodeListOf<HTMLElement>;
                if (target.length == 2) {
                    __setDivPvalue(target[0], uprompt);
                } else {
                    __setDivPvalue(target[1], uprompt);
                }
                resolve();
            }, opInterval / 2);
        }, opInterval);
    });
};

const setImageSettingSize = (width: number, height: number) => {
    setReactInputNativeValue(document.querySelectorAll("input[step='64'][type='number']")[0] as ReactHTMLInputElement, width.toString());
    setReactInputNativeValue(document.querySelectorAll("input[step='64'][type='number']")[1] as ReactHTMLInputElement, height.toString());
};

const clickDownloadZIPButton = (delay: number) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            const button = document.querySelector('#historyContainer > button') as HTMLElement;
            if (button != null) {
                button.click();
            }
            resolve();
        }, 1000 * delay);
    });
};

export { insertPrompt, insertUndesiredContent, setImageSettingSize, clickDownloadZIPButton };
