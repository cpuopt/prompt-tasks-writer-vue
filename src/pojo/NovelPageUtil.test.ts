// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { actAndWaitXPath } from './domActions';
import {
  clickDownloadZIPButton,
  getCurrentModelInfo,
  insertPrompt,
  insertUndesiredContent,
  NOVEL_AI_MODEL_NAMES,
  setCharacterPrompts,
  setImageSettingSize
} from './NovelPageUtil';

vi.mock('./domActions', () => ({
  actAndWaitXPath: vi.fn()
}));

const mockedActAndWaitXPath = vi.mocked(actAndWaitXPath);

const setBody = (html: string) => {
  document.body.innerHTML = html;
};

describe('NovelPageUtil DOM 页面操作', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockedActAndWaitXPath.mockReset();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('insertPrompt', () => {
    it('点击 Prompt 页签并写入正向提示词', async () => {
      setBody(`
        <div class="image-gen-panel">
          <div class="image-gen-prompt-main">
            <button>Prompt</button>
            <div class="prompt-input-box-prompt">
              <div contenteditable="true"><p></p></div>
            </div>
          </div>
        </div>
      `);
      const button = document.querySelector('button') as HTMLButtonElement;
      const target = document.querySelector('p') as HTMLParagraphElement;
      const click = vi.spyOn(button, 'click');
      const focus = vi.spyOn(target, 'focus');
      const blur = vi.spyOn(target, 'blur');

      const operation = insertPrompt('masterpiece, 1girl');
      await vi.runAllTimersAsync();
      await operation;

      expect(click).toHaveBeenCalledOnce();
      expect(target.innerText).toBe('masterpiece, 1girl');
      expect(focus).toHaveBeenCalledOnce();
      expect(blur).toHaveBeenCalledOnce();
    });

    it('目标输入框不存在时仍能正常结束', async () => {
      setBody('<div class="image-gen-panel"><div class="image-gen-prompt-main"></div></div>');

      const operation = insertPrompt('ignored');
      await vi.runAllTimersAsync();

      await expect(operation).resolves.toBeUndefined();
    });

    it('Prompt 按钮不存在但输入框存在时仍同步内容', async () => {
      setBody(`
        <div class="image-gen-panel"><div class="image-gen-prompt-main">
          <div class="prompt-input-box-prompt"><div contenteditable="true"><p></p></div></div>
        </div></div>
      `);
      const target = document.querySelector('p') as HTMLElement;

      const operation = insertPrompt('prompt without tab button');
      await vi.runAllTimersAsync();
      await operation;

      expect(target.innerText).toBe('prompt without tab button');
    });
  });

  it('insertUndesiredContent 点击页签并写入反向提示词', async () => {
    setBody(`
      <div class="image-gen-panel">
        <div class="image-gen-prompt-main">
          <button>Undesired Content</button>
          <div class="prompt-input-box-undesired-content">
            <div contenteditable="true"><p></p></div>
          </div>
        </div>
      </div>
    `);
    const button = document.querySelector('button') as HTMLButtonElement;
    const target = document.querySelector('p') as HTMLParagraphElement;
    const click = vi.spyOn(button, 'click');
    const focus = vi.spyOn(target, 'focus');
    const blur = vi.spyOn(target, 'blur');

    const operation = insertUndesiredContent('lowres, blurry');
    await vi.runAllTimersAsync();
    await operation;

    expect(click).toHaveBeenCalledOnce();
    expect(target.innerText).toBe('lowres, blurry');
    expect(focus).toHaveBeenCalledOnce();
    expect(blur).toHaveBeenCalledOnce();
  });

  it('insertUndesiredContent 输入框不存在时点击页签后正常结束', async () => {
    setBody('<div class="image-gen-panel"><div class="image-gen-prompt-main"><button>Undesired Content</button></div></div>');
    const button = document.querySelector('button') as HTMLButtonElement;
    const click = vi.spyOn(button, 'click');

    const operation = insertUndesiredContent('ignored');
    await vi.runAllTimersAsync();

    await expect(operation).resolves.toBeUndefined();
    expect(click).toHaveBeenCalledOnce();
  });

  it('setImageSettingSize 更新宽高并触发可冒泡的 change 事件', () => {
    setBody(`
      <div class="image-gen-panel">
        <input step="64" type="number" value="512">
        <input step="64" type="number" value="512">
      </div>
    `);
    const [widthInput, heightInput] = Array.from(document.querySelectorAll('input')) as HTMLInputElement[];
    const widthTracker = { setValue: vi.fn() };
    const heightTracker = { setValue: vi.fn() };
    Object.assign(widthInput, { _valueTracker: widthTracker });
    Object.assign(heightInput, { _valueTracker: heightTracker });
    const parentChange = vi.fn();
    document.querySelector('.image-gen-panel')?.addEventListener('change', parentChange);

    setImageSettingSize(1024, 768);

    expect(widthInput.value).toBe('1024');
    expect(heightInput.value).toBe('768');
    expect(widthTracker.setValue).toHaveBeenCalledWith('512');
    expect(heightTracker.setValue).toHaveBeenCalledWith('512');
    expect(parentChange).toHaveBeenCalledTimes(2);
  });

  it('setImageSettingSize 缺少宽高输入框时不执行部分写入并抛出明确错误', () => {
    setBody('<div class="image-gen-panel"><input step="64" type="number" value="512"></div>');
    const input = document.querySelector('input') as HTMLInputElement;
    const change = vi.fn();
    input.addEventListener('change', change);

    expect(() => setImageSettingSize(1024, 768)).toThrow('期望 2 个宽高输入框，实际找到 1 个');
    expect(input.value).toBe('512');
    expect(change).not.toHaveBeenCalled();
  });

  it('getCurrentModelInfo 能识别全部模型名称、版本和类型', () => {
    const expected = [
      ['V5 Full', 'V5', 'Full'],
      ['V5 Curated', 'V5', 'Curated'],
      ['V4.5 Curated', 'V4.5', 'Curated'],
      ['V4.5 Full', 'V4.5', 'Full'],
      ['V4 Curated', 'V4', 'Curated'],
      ['V4 Full', 'V4', 'Full'],
      ['Anime V3', 'V3', 'Anime'],
      ['Furry V3', 'V3', 'Furry']
    ];

    expect(NOVEL_AI_MODEL_NAMES).toHaveLength(expected.length);
    for (const [name, version, variant] of expected) {
      setBody(`<div class="image-gen-model-mode-row"><div>  ${name}  </div><input aria-label="Select the Model"></div>`);
      expect(getCurrentModelInfo()).toEqual({ name, version, variant });
    }
  });

  it('getCurrentModelInfo 模型节点缺失时返回空模型信息', () => {
    expect(getCurrentModelInfo()).toEqual({ name: null, version: null, variant: null });
  });

  describe('setCharacterPrompts', () => {
    it('V3 模型即使存在角色容器也不测试或处理角色提示词', async () => {
      for (const modelName of ['Anime V3', 'Furry V3']) {
        setBody(`
          <div class="image-gen-model-mode-row"><div>${modelName}</div><input aria-label="Select the Model"></div>
          <div class="image-gen-panel">
            <div class="image-gen-character-prompts"></div>
            <div class="character-prompt-input"><button>Prompt</button></div>
          </div>
        `);
        await setCharacterPrompts([{ prompts: 'hero', uprompts: 'villain' }]);
      }

      expect(mockedActAndWaitXPath).not.toHaveBeenCalled();
    });

    it('V4、V4.5、V5 的 Full 和 Curated 模型都测试角色输入框', async () => {
      const models = ['V5 Full', 'V5 Curated', 'V4.5 Full', 'V4.5 Curated', 'V4 Full', 'V4 Curated'];
      for (const modelName of models) {
        setBody(`
          <div class="image-gen-model-mode-row"><div>${modelName}</div><input aria-label="Select the Model"></div>
          <div class="image-gen-panel">
            <div class="image-gen-character-prompts"></div>
            <div class="character-prompt-input">
              <button>Prompt</button>
              <button>Undesired Content</button>
              <div class="prompt-input-box-character-prompts"><p></p></div>
            </div>
          </div>
        `);
        const promptInput = document.querySelector('p') as HTMLParagraphElement;
        mockedActAndWaitXPath.mockImplementation(async (action) => {
          action();
          return promptInput;
        });

        const operation = setCharacterPrompts([{ prompts: `${modelName} prompt`, uprompts: `${modelName} undesired` }]);
        await vi.runAllTimersAsync();
        await operation;

        expect(promptInput.innerText).toBe(`${modelName} undesired`);
      }
      expect(mockedActAndWaitXPath).toHaveBeenCalledTimes(models.length);
    });

    it('角色输入框数量不足时点击 Add Character 和 Other 补足数量后同步内容', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel">
          <div class="image-gen-character-prompts-header"><div><span><div><button class="add-character">Add Character</button></div></span></div></div>
          <div class="image-gen-character-prompts"></div>
        </div>
      `);
      const container = document.querySelector('.image-gen-character-prompts') as HTMLElement;
      const addButton = document.querySelector('.add-character') as HTMLButtonElement;
      const addClick = vi.spyOn(addButton, 'click');
      addButton.addEventListener('click', () => {
        const otherButton = document.createElement('button');
        otherButton.textContent = 'Other';
        otherButton.addEventListener('click', () => {
          container.insertAdjacentHTML(
            'beforeend',
            `<div class="character-prompt-input">
              <button>Prompt</button>
              <button>Undesired Content</button>
              <div class="prompt-input-box-character-prompts"><p></p></div>
            </div>`
          );
          otherButton.remove();
        });
        document.body.append(otherButton);
      });
      mockedActAndWaitXPath.mockImplementation(async (action, xpath) => {
        action();
        if (xpath === "//button[text()='Other']") return Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'Other') as HTMLButtonElement;
        return document.querySelector('.character-prompt-input p') as HTMLParagraphElement;
      });

      const operation = setCharacterPrompts([{ prompts: 'added prompt', uprompts: 'added undesired' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(addClick).toHaveBeenCalledOnce();
      expect(document.querySelectorAll('.character-prompt-input')).toHaveLength(1);
      expect((document.querySelector('.character-prompt-input p') as HTMLElement).innerText).toBe('added undesired');
    });

    it('角色区折叠时点击摘要按钮展开并分别同步正向和反向内容', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts">
          <div class="character-prompt-input character-prompt-input-1">
            <div class="content" style="display: none">
              <button>Prompt</button><button>Undesired Content</button>
              <div class="prompt-input-box-character-prompts-1"><div contenteditable="true"><p></p></div></div>
              <div class="prompt-input-box-character-prompts-1-undesired-content"><div contenteditable="true"><p></p></div></div>
            </div>
            <button class="summary"><span>summary</span></button>
          </div>
        </div></div>
      `);
      const characterInput = document.querySelector('.character-prompt-input') as HTMLElement;
      const content = document.querySelector('.content') as HTMLElement;
      const summaryButton = document.querySelector('.summary') as HTMLButtonElement;
      const summaryClick = vi.spyOn(summaryButton, 'click');
      summaryButton.addEventListener('click', () => {
        content.style.display = '';
        summaryButton.remove();
      });
      const promptInput = document.querySelector('.prompt-input-box-character-prompts-1 p') as HTMLElement;
      const undesiredInput = document.querySelector('.prompt-input-box-character-prompts-1-undesired-content p') as HTMLElement;
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return promptInput;
      });

      const operation = setCharacterPrompts([{ prompts: 'expanded prompt', uprompts: 'expanded undesired' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(summaryClick).toHaveBeenCalledOnce();
      expect(content.style.display).toBe('');
      expect(promptInput.innerText).toBe('expanded prompt');
      expect(undesiredInput.innerText).toBe('expanded undesired');
    });

    it('折叠角色区缺少摘要按钮时输出明确错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts">
          <div class="character-prompt-input character-prompt-input-1">
            <div style="display: none"><button>Prompt</button><button>Undesired Content</button><div class="prompt-input-box-character-prompts-1"><p></p></div></div>
          </div>
        </div></div>
      `);
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      const operation = setCharacterPrompts([{ prompts: 'hero', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: '第 1 个折叠角色提示词输入区没有摘要展开按钮' }));
    });

    it('点击摘要按钮但角色区未展开时停止等待并输出一次错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts">
          <div class="character-prompt-input character-prompt-input-1">
            <div style="display: none"><button>Prompt</button><button>Undesired Content</button><div class="prompt-input-box-character-prompts-1"><p></p></div></div>
            <button class="summary">summary</button>
          </div>
        </div></div>
      `);
      const summaryButton = document.querySelector('.summary') as HTMLButtonElement;
      const summaryClick = vi.spyOn(summaryButton, 'click');
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      const operation = setCharacterPrompts([{ prompts: 'hero', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(summaryClick).toHaveBeenCalledOnce();
      expect(consoleError).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: '等待第 1 个角色提示词输入区展开超时' }));
    });

    it('数量不足但添加角色按钮缺失时输出明确错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts"></div></div>
      `);
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        throw new Error('不应到达等待阶段');
      });

      const operation = setCharacterPrompts([{ prompts: 'hero', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await expect(operation).resolves.toBeUndefined();

      expect(consoleError).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: '角色提示词已启用，但页面没有添加角色按钮' }));
    });

    it('点击 Other 后角色数量未增加时停止递归并输出一次错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel">
          <div class="image-gen-character-prompts-header"><div><span><div><button class="add"></button></div></span></div></div>
          <div class="image-gen-character-prompts"></div>
        </div>
      `);
      const otherButton = document.createElement('button');
      otherButton.textContent = 'Other';
      const otherClick = vi.spyOn(otherButton, 'click');
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return otherButton;
      });

      const operation = setCharacterPrompts([{ prompts: 'hero', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(otherClick).toHaveBeenCalledOnce();
      expect(consoleError).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: expect.stringContaining('等待角色输入框数量变为 1 超时') }));
    });

    it('正向和反向内容相同时跳过写入', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V4 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel">
          <div class="image-gen-character-prompts">
            <div class="character-prompt-input">
              <button>Prompt</button>
              <button>Undesired Content</button>
              <div class="prompt-input-box-character-prompts"><p></p></div>
            </div>
          </div>
        </div>
      `);
      const promptInput = document.querySelector('p') as HTMLParagraphElement;
      promptInput.innerText = 'same prompt';
      const focus = vi.spyOn(promptInput, 'focus');
      const blur = vi.spyOn(promptInput, 'blur');
      const promptButton = Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'Prompt') as HTMLButtonElement;
      const promptClick = vi.spyOn(promptButton, 'click');
      const undesiredButton = Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'Undesired Content') as HTMLButtonElement;
      const undesiredClick = vi.spyOn(undesiredButton, 'click');
      undesiredButton.addEventListener('click', () => {
        promptInput.innerText = 'same undesired';
      });
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return promptInput;
      });

      const operation = setCharacterPrompts([{ prompts: 'same prompt', uprompts: 'same undesired' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(focus).not.toHaveBeenCalled();
      expect(blur).not.toHaveBeenCalled();
      expect(promptClick).toHaveBeenCalledOnce();
      expect(undesiredClick).toHaveBeenCalledOnce();
      expect(promptInput.innerText).toBe('same undesired');
    });

    it('角色区展开时无需点击摘要按钮并分别写入正向和反向提示词', async () => {
      setBody(`
        <div class="image-gen-panel">
          <button>Add Character</button>
          <div class="image-gen-character-prompts"></div>
          <div class="character-prompt-input character-prompt-input-1">
            <div class="content">
              <button>Prompt</button><button>Undesired Content</button>
              <div class="prompt-input-box-character-prompts-1"><div contenteditable="true"><p></p></div></div>
              <div class="prompt-input-box-character-prompts-1-undesired-content"><div contenteditable="true"><p></p></div></div>
            </div>
          </div>
        </div>
      `);
      const promptInput = document.querySelector('.prompt-input-box-character-prompts-1 p') as HTMLParagraphElement;
      const undesiredInput = document.querySelector('.prompt-input-box-character-prompts-1-undesired-content p') as HTMLParagraphElement;
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return promptInput;
      });

      const operation = setCharacterPrompts([{ prompts: 'silver hair', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(mockedActAndWaitXPath).toHaveBeenCalledOnce();
      expect(promptInput.innerText).toBe('silver hair');
      expect(undesiredInput.innerText).toBe('bad hands');
    });

    it('角色输入区缺少按钮时输出明确错误且不产生未处理的 Promise 异常', async () => {
      setBody(`
        <div class="image-gen-panel">
          <div class="image-gen-character-prompts"></div>
          <div class="character-prompt-input"></div>
        </div>
      `);
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      const operation = setCharacterPrompts([{ prompts: 'hero', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await expect(operation).resolves.toBeUndefined();

      expect(consoleError).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: '第 1 个角色提示词输入区没有 Prompt 内容区域' }));
    });

    it('点击 Prompt 后输入框未出现时输出等待错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts">
          <div class="character-prompt-input"><button>Prompt</button><button>Undesired Content</button></div>
        </div></div>
      `);
      const promptButton = Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'Prompt') as HTMLButtonElement;
      const promptClick = vi.spyOn(promptButton, 'click');
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        throw new Error('Timeout waiting for character prompt input');
      });

      const operation = setCharacterPrompts([{ prompts: 'hero', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await expect(operation).resolves.toBeUndefined();

      expect(promptClick).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: 'Timeout waiting for character prompt input' }));
    });

    it('Undesired Content 按钮缺失时输出明确错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts">
          <div class="character-prompt-input"><button>Prompt</button><div class="prompt-input-box-character-prompts"><p></p></div></div>
        </div></div>
      `);
      const promptInput = document.querySelector('p') as HTMLElement;
      promptInput.innerText = 'same prompt';
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return promptInput;
      });

      const operation = setCharacterPrompts([{ prompts: 'same prompt', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: '第 1 个角色提示词输入区没有 Undesired Content 按钮' }));
    });

    it('点击 Undesired Content 后反向输入框缺失时输出明确错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel"><div class="image-gen-character-prompts">
          <div class="character-prompt-input"><button>Prompt</button><button>Undesired Content</button><div class="prompt-input-box-character-prompts"><p></p></div></div>
        </div></div>
      `);
      const promptInput = document.querySelector('p') as HTMLElement;
      promptInput.innerText = 'same prompt';
      const undesiredButton = Array.from(document.querySelectorAll('button')).find((button) => button.textContent === 'Undesired Content') as HTMLButtonElement;
      const undesiredClick = vi.spyOn(undesiredButton, 'click');
      undesiredButton.addEventListener('click', () => promptInput.remove());
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return promptInput;
      });

      const operation = setCharacterPrompts([{ prompts: 'same prompt', uprompts: 'bad hands' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(undesiredClick).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: '第 1 个角色提示词输入区没有可写入的反向提示词输入框' }));
    });

    it('角色数量多于配置时删除多余输入区', async () => {
      setBody(`
        <div class="image-gen-panel">
          <button>Add Character</button>
          <div class="image-gen-character-prompts"></div>
          <div class="character-prompt-input character-prompt-input-1">
            <div><button>1</button><button>2</button><button>3</button><button aria-label="remove-1">4</button><button>5</button></div>
            <button>Prompt</button><button>Undesired Content</button><div class="prompt-input-box-character-prompts"><p></p></div>
          </div>
          <div class="character-prompt-input character-prompt-input-2">
            <div><button>1</button><button>2</button><button>3</button><button aria-label="remove-2">4</button><button>5</button></div>
          </div>
        </div>
      `);
      const extraCharacter = document.querySelector('.character-prompt-input-2') as HTMLElement;
      const removeClick = vi.spyOn(document.querySelector('button[aria-label="remove-2"]') as HTMLButtonElement, 'click');
      document.querySelector('button[aria-label="remove-2"]')?.addEventListener('click', () => extraCharacter.remove());
      mockedActAndWaitXPath.mockImplementation(async (action) => {
        action();
        return document.querySelector('.character-prompt-input-1 p') as HTMLElement;
      });

      const operation = setCharacterPrompts([{ prompts: '', uprompts: '' }]);
      await vi.runAllTimersAsync();
      await operation;

      expect(removeClick).toHaveBeenCalledOnce();
      expect(document.querySelectorAll('.character-prompt-input')).toHaveLength(1);
      expect(document.querySelector('.character-prompt-input-1')).not.toBeNull();
    });

    it('删除按钮未生效时停止递归且只输出一次错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel">
          <div class="image-gen-character-prompts"></div>
          <div class="character-prompt-input character-prompt-input-1">
            <div><button>1</button><button>2</button><button>3</button><button aria-label="remove">4</button><button>5</button></div>
          </div>
        </div>
      `);
      const consoleLog = vi.spyOn(console, 'log').mockImplementation(() => undefined);
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      const operation = setCharacterPrompts([]);
      await vi.runAllTimersAsync();
      await expect(operation).resolves.toBeUndefined();

      expect(consoleLog).not.toHaveBeenCalledWith('-1 角色');
      expect(consoleError).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: expect.stringContaining('等待角色输入框数量变为 0 超时') }));
    });

    it('角色数量过多但删除按钮缺失时输出明确错误', async () => {
      setBody(`
        <div class="image-gen-model-mode-row"><div>V5 Full</div><input aria-label="Select the Model"></div>
        <div class="image-gen-panel">
          <div class="image-gen-character-prompts"></div>
          <div class="character-prompt-input character-prompt-input-1"><button>Prompt</button></div>
        </div>
      `);
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

      await expect(setCharacterPrompts([])).resolves.toBeUndefined();

      expect(consoleError).toHaveBeenCalledOnce();
      expect(consoleError.mock.calls[0][1]).toEqual(expect.objectContaining({ message: expect.stringContaining('内含 5 个按钮的容器中的第 4 个删除按钮') }));
    });
  });

  describe('clickDownloadZIPButton', () => {
    it('等待指定秒数后点击下载按钮', async () => {
      setBody('<div id="historyContainer"><button>Download ZIP</button></div>');
      const button = document.querySelector('#historyContainer > button') as HTMLButtonElement;
      const click = vi.spyOn(button, 'click');

      const operation = clickDownloadZIPButton(2);
      await vi.advanceTimersByTimeAsync(1999);
      expect(click).not.toHaveBeenCalled();
      await vi.advanceTimersByTimeAsync(1);
      await operation;

      expect(click).toHaveBeenCalledOnce();
    });

    it('下载按钮不存在时正常结束', async () => {
      const operation = clickDownloadZIPButton(0);
      await vi.runAllTimersAsync();

      await expect(operation).resolves.toBeUndefined();
    });
  });
});
