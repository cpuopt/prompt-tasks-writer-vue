import { actAndWaitXPath } from './domActions';

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
  return new Promise<void>((resolve, reject) => {
    el.innerText = value;
    setTimeout(() => {
      el.focus();
      el.blur();
      resolve();
    }, opInterval / 2);
  });
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
      let Prompt_button = document.evaluate(
        "//div[contains(@class,'settings-panel')]//div[@class='image-gen-prompt-main']//button[text()='Prompt' or text()='Base Prompt']",
        document.body,
        null,
        9,
        null
      ).singleNodeValue as HTMLElement | null;
      if (Prompt_button != null) {
        Prompt_button.click();
      }
      setTimeout(async () => {
        const target = document.querySelector('div.settings-panel :is(div.prompt-input-box-base-prompt, div.prompt-input-box-prompt) div[contenteditable]>p') as HTMLElement;
        if (target) {
          await __setDivPvalue(target, prompt);
        }
        setTimeout(() => {
          resolve();
        }, opInterval / 2);
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
      let Prompt_button = document.evaluate("//div[contains(@class,'settings-panel')]//div[@class='image-gen-prompt-main']//button[text()='Undesired Content']", document.body, null, 9, null)
        .singleNodeValue as HTMLElement | null;
      if (Prompt_button != null) {
        Prompt_button.click();
      }
      setTimeout(async () => {
        const target = document.querySelector('div.settings-panel div.image-gen-prompt-main .prompt-input-box-undesired-content div[contenteditable]>p') as HTMLElement;
        if (target) {
          await __setDivPvalue(target, uprompt);
        }
        resolve();
      }, opInterval / 2);
    }, opInterval);
  });
};

const insertCharacterPrompt = async (prompt: string, uprompt: string, _i: number) => {
  const prompt_button = await actAndWaitXPath(() => {
    (
      document.evaluate(`//div[contains(@class,'settings-panel')]//div[contains(@class,'character-prompt-input-${_i}')]//div[@role='button']`, document.body, null, 9, null)
        .singleNodeValue as HTMLElement
    ).click();
  }, `//div[contains(@class,'settings-panel')]//div[contains(@class,'character-prompt-input-${_i}')]//button[text()='Prompt']`);

  const prompt_input = await actAndWaitXPath(() => {
    prompt_button.click();
  }, `//div[contains(@class,'settings-panel')]//div[contains(@class,'character-prompt-input-${_i}')]//div[@class='prompt-input-box-character-prompts-${_i}']//p`);
  if (prompt_input.innerText == prompt) {
    console.log('角色正向提示词输入框内容相同，跳过');
  } else {
    await new Promise((r) => setTimeout(r, opInterval));
    await __setDivPvalue(prompt_input, prompt);
  }
  await new Promise((r) => setTimeout(r, opInterval));
  (
    document.evaluate(`//div[contains(@class,'settings-panel')]//div[contains(@class,'character-prompt-input-${_i}')]//button[text()='Undesired Content']`, document.body, null, 9, null)
      .singleNodeValue as HTMLElement
  ).click();
  await new Promise((r) => setTimeout(r, opInterval));

  const uprompt_input = document.evaluate(
    `//div[contains(@class,'settings-panel')]//div[contains(@class,'character-prompt-input-${_i}')]//div[@class='prompt-input-box-character-prompts-${_i}']//p`,
    document.body,
    null,
    9,
    null
  ).singleNodeValue as HTMLElement;
  if (uprompt_input.innerText == uprompt) {
    console.log('角色反向提示词输入框内容相同，跳过');
  } else {
    await new Promise((r) => setTimeout(r, opInterval));
    await __setDivPvalue(uprompt_input, uprompt);
  }

  await new Promise((r) => setTimeout(r, opInterval));
};

const setImageSettingSize = (width: number, height: number) => {
  setReactInputNativeValue(document.querySelectorAll("div.settings-panel input[step='64'][type='number']")[0] as ReactHTMLInputElement, width.toString());
  setReactInputNativeValue(document.querySelectorAll("div.settings-panel input[step='64'][type='number']")[1] as ReactHTMLInputElement, height.toString());
};

const setCharacterPrompts = async (character_prompts: Array<object>) => {
  console.log(character_prompts);
  if (null == document.evaluate("//div[contains(@class,'settings-panel')]//button[text()='Add Character']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    console.log('使用的是V3模型，无角色提示词，忽略处理角色提示词');
    return;
  }
  await adjustCharacterInputNum(character_prompts.length);
  for (const [_i, { prompts, uprompts }] of character_prompts.entries()) {
    await insertCharacterPrompt(prompts, uprompts, _i + 1);
    await new Promise((r) => setTimeout(r, opInterval));
  }
};

const adjustCharacterInputNum = async (target_num: number) => {
  const exist_character = document.querySelectorAll('div.settings-panel div.character-prompt-input');
  if (exist_character.length < target_num) {
    const OtherButton = await actAndWaitXPath(() => {
      (document.evaluate("//div[contains(@class,'settings-panel')]//button[text()='Add Character']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue as HTMLElement).click();
    }, "//button[text()='Other']");
    OtherButton.click();
    console.log('+1 角色');
    await new Promise((r) => setTimeout(r, opInterval));
    await adjustCharacterInputNum(target_num);
  } else if (exist_character.length > target_num) {
    (
      document.evaluate(
        `//div[contains(@class,'settings-panel')]//div[contains(@class,'character-prompt-input-1')]//div[@role="button"]//button[not(normalize-space())]`,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue as HTMLElement
    ).click();
    await new Promise((r) => setTimeout(r, opInterval));
    console.log('-1 角色');
    await adjustCharacterInputNum(target_num);
  } else {
    await new Promise((r) => setTimeout(r, opInterval));
    return;
  }
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

export { insertPrompt, insertUndesiredContent, setImageSettingSize, clickDownloadZIPButton, setCharacterPrompts };
