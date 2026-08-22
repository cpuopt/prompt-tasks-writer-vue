import { actAndWaitXPath } from './domActions';

const opInterval = 100;

const NOVEL_AI_MODEL_NAMES = ['V5 Full', 'V5 Curated', 'V4.5 Curated', 'V4.5 Full', 'V4 Curated', 'V4 Full', 'Anime V3', 'Furry V3'] as const;

type NovelAIModelName = (typeof NOVEL_AI_MODEL_NAMES)[number];
type NovelAIModelVersion = 'V5' | 'V4.5' | 'V4' | 'V3';
type NovelAIModelVariant = 'Full' | 'Curated' | 'Anime' | 'Furry';

interface NovelAIModelInfo {
  name: NovelAIModelName | null;
  version: NovelAIModelVersion | null;
  variant: NovelAIModelVariant | null;
}

const getCurrentModelInfo = (): NovelAIModelInfo => {
  const modelNameElement = document.evaluate(
    "//div[contains(@class,'image-gen-model-mode-row')]//input[@aria-label='Select the Model']/preceding-sibling::div[1]",
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement | null;
  const text = modelNameElement?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  const name = NOVEL_AI_MODEL_NAMES.find((modelName) => modelName === text) ?? null;

  if (!name) return { name: null, version: null, variant: null };
  if (name.startsWith('V5 ')) return { name, version: 'V5', variant: name.endsWith('Full') ? 'Full' : 'Curated' };
  if (name.startsWith('V4.5 ')) return { name, version: 'V4.5', variant: name.endsWith('Full') ? 'Full' : 'Curated' };
  if (name.startsWith('V4 ')) return { name, version: 'V4', variant: name.endsWith('Full') ? 'Full' : 'Curated' };
  return { name, version: 'V3', variant: name.startsWith('Anime') ? 'Anime' : 'Furry' };
};

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
        "//div[contains(@class,'image-gen-panel')]//div[@class='image-gen-prompt-main']//button[text()='Prompt' or text()='Base Prompt']",
        document.body,
        null,
        9,
        null
      ).singleNodeValue as HTMLElement | null;
      if (Prompt_button != null) {
        Prompt_button.click();
      }
      setTimeout(async () => {
        const target = document.querySelector('div.image-gen-panel :is(div.prompt-input-box-base-prompt, div.prompt-input-box-prompt) div[contenteditable]>p') as HTMLElement;
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
      let Prompt_button = document.evaluate("//div[contains(@class,'image-gen-panel')]//div[@class='image-gen-prompt-main']//button[text()='Undesired Content']", document.body, null, 9, null)
        .singleNodeValue as HTMLElement | null;
      if (Prompt_button != null) {
        Prompt_button.click();
      }
      setTimeout(async () => {
        const target = document.querySelector('div.image-gen-panel div.image-gen-prompt-main .prompt-input-box-undesired-content div[contenteditable]>p') as HTMLElement;
        if (target) {
          await __setDivPvalue(target, uprompt);
        }
        resolve();
      }, opInterval / 2);
    }, opInterval);
  });
};

const getCharacterInput = (index: number): HTMLElement | null => {
  return document.querySelectorAll<HTMLElement>('div.image-gen-panel div.character-prompt-input').item(index - 1);
};

const findButtonByText = (root: ParentNode, text: string): HTMLButtonElement | null => {
  return Array.from(root.querySelectorAll('button')).find((button) => button.textContent?.trim() === text) ?? null;
};

const findCharacterRemoveButton = (characterInput: HTMLElement): HTMLButtonElement | null => {
  const buttonContainer = Array.from(characterInput.querySelectorAll('div'))
    .reverse()
    .find((container) => container.querySelectorAll('button').length === 5);
  return buttonContainer?.querySelectorAll<HTMLButtonElement>('button').item(3) ?? null;
};

const getCharacterContentContainer = (characterInput: HTMLElement): HTMLElement | null => {
  const promptButton = findButtonByText(characterInput, 'Prompt');
  if (!promptButton) return null;
  return (
    Array.from(characterInput.children).find((child) => child.contains(promptButton)) as HTMLElement | undefined
  ) ?? null;
};

const getCharacterPromptInput = (characterInput: HTMLElement, undesired = false): HTMLElement | null => {
  const boxes = Array.from(characterInput.querySelectorAll<HTMLElement>("div[class*='prompt-input-box-character-prompts']"));
  const box = boxes.find((candidate) => candidate.className.includes('undesired-content') === undesired);
  if (box) return box.querySelector<HTMLElement>('div[contenteditable] > p, p');
  // 兼容旧版页面中正反向共用同一个编辑器的结构。
  if (undesired && boxes.length === 1) return boxes[0].querySelector<HTMLElement>('div[contenteditable] > p, p');
  return null;
};

const waitForCondition = (condition: () => boolean, timeoutMessage: string, timeout = 3000): Promise<void> => {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const check = () => {
      if (condition()) {
        resolve();
      } else if (Date.now() - startedAt >= timeout) {
        reject(new Error(timeoutMessage));
      } else {
        setTimeout(check, opInterval / 2);
      }
    };
    check();
  });
};

const expandCharacterInput = async (index: number): Promise<void> => {
  const characterInput = getCharacterInput(index);
  if (!characterInput) throw new Error(`找不到第 ${index} 个角色提示词输入区`);
  const contentContainer = getCharacterContentContainer(characterInput);
  if (!contentContainer) throw new Error(`第 ${index} 个角色提示词输入区没有 Prompt 内容区域`);
  if (contentContainer.style.display !== 'none') return;

  const summaryButton = Array.from(characterInput.children).find((child) => child.tagName === 'BUTTON') as HTMLButtonElement | undefined;
  if (!summaryButton) throw new Error(`第 ${index} 个折叠角色提示词输入区没有摘要展开按钮`);
  summaryButton.click();
  await waitForCondition(() => {
    const currentInput = getCharacterInput(index);
    const currentContent = currentInput ? getCharacterContentContainer(currentInput) : null;
    return Boolean(currentContent && currentContent.style.display !== 'none');
  }, `等待第 ${index} 个角色提示词输入区展开超时`);
};

const characterXPath = (index: number, childXPath: string): string => {
  return `(//div[contains(@class,'image-gen-panel')]//div[contains(concat(' ', normalize-space(@class), ' '), ' character-prompt-input ')])[${index}]${childXPath}`;
};

const insertCharacterPrompt = async (prompt: string, uprompt: string, _i: number) => {
  let characterInput = getCharacterInput(_i);
  if (!characterInput) throw new Error(`找不到第 ${_i} 个角色提示词输入区`);

  await expandCharacterInput(_i);
  characterInput = getCharacterInput(_i);
  if (!characterInput) throw new Error(`展开后找不到第 ${_i} 个角色提示词输入区`);
  const prompt_button = findButtonByText(characterInput, 'Prompt');
  if (!prompt_button) throw new Error(`第 ${_i} 个角色提示词输入区没有 Prompt 按钮`);

  const prompt_input = (await actAndWaitXPath(() => {
    prompt_button.click();
  }, characterXPath(_i, `//div[contains(concat(' ', normalize-space(@class), ' '), ' prompt-input-box-character-prompts-${_i} ')]//p`))) as HTMLElement;
  if (prompt_input.innerText == prompt) {
    console.log('角色正向提示词输入框内容相同，跳过');
  } else {
    await new Promise((r) => setTimeout(r, opInterval));
    await __setDivPvalue(prompt_input, prompt);
  }
  await new Promise((r) => setTimeout(r, opInterval));
  characterInput = getCharacterInput(_i);
  if (!characterInput) throw new Error(`切换提示词页签后找不到第 ${_i} 个角色提示词输入区`);
  const undesiredButton = findButtonByText(characterInput, 'Undesired Content');
  if (!undesiredButton) throw new Error(`第 ${_i} 个角色提示词输入区没有 Undesired Content 按钮`);
  undesiredButton.click();
  await new Promise((r) => setTimeout(r, opInterval));

  characterInput = getCharacterInput(_i);
  const uprompt_input = characterInput ? getCharacterPromptInput(characterInput, true) : null;
  if (!uprompt_input) throw new Error(`第 ${_i} 个角色提示词输入区没有可写入的反向提示词输入框`);
  if (uprompt_input.innerText == uprompt) {
    console.log('角色反向提示词输入框内容相同，跳过');
  } else {
    await new Promise((r) => setTimeout(r, opInterval));
    await __setDivPvalue(uprompt_input, uprompt);
  }

  await new Promise((r) => setTimeout(r, opInterval));
};

const setImageSettingSize = (width: number, height: number) => {
  const inputs = document.querySelectorAll<ReactHTMLInputElement>("div.image-gen-panel input[step='64'][type='number']");
  if (inputs.length < 2) throw new Error(`设置图片尺寸失败：期望 2 个宽高输入框，实际找到 ${inputs.length} 个`);
  setReactInputNativeValue(inputs[0], width.toString());
  setReactInputNativeValue(inputs[1], height.toString());
};

interface CharacterPrompt {
  prompts: string;
  uprompts: string;
}

const setCharacterPrompts = async (character_prompts: CharacterPrompt[]) => {
  console.log(character_prompts);
  const model = getCurrentModelInfo();
  if (model.version === 'V3') {
    console.log(`当前模型为 ${model.name}，不测试或处理角色提示词`);
    return;
  }
  if (!document.querySelector('div.image-gen-panel div.image-gen-character-prompts')) {
    console.log(`当前模型为 ${model.name ?? '未识别模型'}，页面未启用角色提示词，忽略处理角色提示词`);
    return;
  }
  try {
    await adjustCharacterInputNum(character_prompts.length);
    for (const [_i, { prompts, uprompts }] of character_prompts.entries()) {
      await insertCharacterPrompt(prompts, uprompts, _i + 1);
      await new Promise((r) => setTimeout(r, opInterval));
    }
  } catch (error) {
    console.error('[Prompt Tasks Writer] 设置角色提示词失败：', error);
  }
};

const getCharacterInputCount = (): number => document.querySelectorAll('div.image-gen-panel div.character-prompt-input').length;

const waitForCharacterInputCount = (expectedCount: number, timeout = 3000): Promise<void> => {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const check = () => {
      const actualCount = getCharacterInputCount();
      if (actualCount === expectedCount) {
        resolve();
      } else if (Date.now() - startedAt >= timeout) {
        reject(new Error(`等待角色输入框数量变为 ${expectedCount} 超时，当前数量为 ${actualCount}`));
      } else {
        setTimeout(check, opInterval / 2);
      }
    };
    check();
  });
};

const adjustCharacterInputNum = async (target_num: number) => {
  const exist_character = document.querySelectorAll('div.image-gen-panel div.character-prompt-input');
  if (exist_character.length < target_num) {
    const OtherButton = await actAndWaitXPath(() => {
      const addButton = document.querySelector<HTMLElement>('div.image-gen-panel div.image-gen-character-prompts-header>div>span>div>button');
      if (!addButton) throw new Error('角色提示词已启用，但页面没有添加角色按钮');
      addButton.click();
    }, "//button[text()='Other']");
    OtherButton.click();
    await waitForCharacterInputCount(exist_character.length + 1);
    console.log('+1 角色');
    await adjustCharacterInputNum(target_num);
  } else if (exist_character.length > target_num) {
    const lastCharacter = exist_character.item(exist_character.length - 1) as HTMLElement;
    const expectedClass = `character-prompt-input-${exist_character.length}`;
    if (!lastCharacter.classList.contains(expectedClass)) {
      throw new Error(`最后一个角色输入区缺少预期类名 ${expectedClass}`);
    }
    const removeButton = findCharacterRemoveButton(lastCharacter);
    if (!removeButton) throw new Error(`无法找到 ${expectedClass} 内含 5 个按钮的容器中的第 4 个删除按钮`);
    removeButton.click();
    await waitForCharacterInputCount(exist_character.length - 1);
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

export {
  NOVEL_AI_MODEL_NAMES,
  getCurrentModelInfo,
  insertPrompt,
  insertUndesiredContent,
  setImageSettingSize,
  clickDownloadZIPButton,
  setCharacterPrompts,
  findCharacterRemoveButton,
  getCharacterContentContainer,
  getCharacterPromptInput,
  type NovelAIModelInfo,
  type NovelAIModelName,
  type NovelAIModelVersion
};
