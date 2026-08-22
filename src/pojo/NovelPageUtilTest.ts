import {
  findCharacterRemoveButton,
  getCharacterContentContainer,
  getCharacterPromptInput,
  getCurrentModelInfo,
  insertPrompt,
  insertUndesiredContent,
  NOVEL_AI_MODEL_NAMES,
  setImageSettingSize
} from './NovelPageUtil';

type TestStatus = 'PASS' | 'FAIL' | 'SKIP';

interface TestResult {
  name: string;
  status: TestStatus;
  message: string;
  duration: string;
}

class SkipTestError extends Error {}

/**
 * NovelPageUtil 浏览器内自检。
 *
 * 测试会操作当前 NovelAI 页面，但会使用输入框已有值进行回写，避免修改用户配置。
 * 下载接口只检查目标按钮，不会触发真实下载。
 */
class NovelPageUtilTest {
  private static assert(condition: unknown, message: string): asserts condition {
    if (!condition) throw new Error(message);
  }

  private static skip(message: string): never {
    throw new SkipTestError(message);
  }

  private static async test(name: string, action: () => void | Promise<void>): Promise<TestResult> {
    const start = performance.now();
    try {
      await action();
      return { name, status: 'PASS', message: '通过', duration: `${(performance.now() - start).toFixed(1)} ms` };
    } catch (error) {
      const isSkipped = error instanceof SkipTestError;
      return {
        name,
        status: isSkipped ? 'SKIP' : 'FAIL',
        message: error instanceof Error ? error.message : String(error),
        duration: `${(performance.now() - start).toFixed(1)} ms`
      };
    }
  }

  static async run(): Promise<TestResult[]> {
    console.group('[Prompt Tasks Writer] NovelPageUtil 页面接口测试');

    const results: TestResult[] = [];
    results.push(
      await this.test('页面 DOM 与 XPath API', () => {
        this.assert(document.body, 'document.body 不存在');
        this.assert(typeof document.evaluate === 'function', '当前页面不支持 document.evaluate');
        this.assert(document.querySelector('div.image-gen-panel'), '未找到 NovelAI image-gen-panel，请先进入图片生成页面');
      })
    );
    results.push(
      await this.test('当前模型名称与版本识别', () => {
        const model = getCurrentModelInfo();
        this.assert(model.name, `未识别当前模型，支持的名称：${NOVEL_AI_MODEL_NAMES.join('、')}`);
        this.assert(model.version, `无法判断 ${model.name} 的版本`);
        console.info(`[Prompt Tasks Writer] 当前模型：${model.name}，版本：${model.version}，类型：${model.variant}`);
      })
    );
    results.push(
      await this.test('图片尺寸输入接口', () => {
        const inputs = Array.from(document.querySelectorAll("div.image-gen-panel input[step='64'][type='number']")) as HTMLInputElement[];
        this.assert(inputs.length >= 2, `期望至少 2 个尺寸输入框，实际找到 ${inputs.length} 个`);
        const width = Number(inputs[0].value);
        const height = Number(inputs[1].value);
        this.assert(Number.isFinite(width) && Number.isFinite(height), '宽高输入框不是有效数字');

        setImageSettingSize(width, height);

        this.assert(Number(inputs[0].value) === width, '宽度回写后发生变化');
        this.assert(Number(inputs[1].value) === height, '高度回写后发生变化');
      })
    );
    results.push(
      await this.test('正向提示词输入接口', async () => {
        const button = document.evaluate(
          "//div[contains(@class,'image-gen-panel')]//div[@class='image-gen-prompt-main']//button[text()='Prompt' or text()='Base Prompt']",
          document.body,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        this.assert(button, '未找到 Prompt/Base Prompt 按钮');
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve, 100));
        const input = document.querySelector(
          'div.image-gen-panel :is(div.prompt-input-box-base-prompt, div.prompt-input-box-prompt) div[contenteditable]>p'
        ) as HTMLElement | null;
        this.assert(input, '未找到正向提示词输入框');
        const originalValue = input.innerText ?? '';

        await insertPrompt(originalValue);

        this.assert(input.innerText === originalValue, '正向提示词原值回写失败');
      })
    );
    results.push(
      await this.test('反向提示词输入接口', async () => {
        const button = document.evaluate(
          "//div[contains(@class,'image-gen-panel')]//div[@class='image-gen-prompt-main']//button[text()='Undesired Content']",
          document.body,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
        this.assert(button, '未找到 Undesired Content 按钮');
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await new Promise((resolve) => setTimeout(resolve, 100));
        const input = document.querySelector(
          'div.image-gen-panel div.image-gen-prompt-main .prompt-input-box-undesired-content div[contenteditable]>p'
        ) as HTMLElement | null;
        this.assert(input, '未找到反向提示词输入框');
        const originalValue = input.innerText ?? '';

        await insertUndesiredContent(originalValue);

        this.assert(input.innerText === originalValue, '反向提示词原值回写失败');
      })
    );
    results.push(
      await this.test('角色提示词页面接口', () => {
        const model = getCurrentModelInfo();
        this.assert(model.name, '无法识别当前模型，不能判断角色提示词支持情况');
        if (model.version === 'V3') this.skip(`${model.name} 不测试角色输入框`);
        const characterPrompts = document.querySelector('div.image-gen-panel div.image-gen-character-prompts');
        this.assert(characterPrompts, `${model.name} 页面缺少角色提示词容器`);
        this.assert(characterPrompts instanceof HTMLElement, '角色提示词容器目标不是 HTMLElement');
        const inputs = document.querySelectorAll<HTMLElement>('div.image-gen-panel div.character-prompt-input');
        const addButton = document.querySelector('div.image-gen-panel div.image-gen-character-prompts-header>div>span>div>button');
        this.assert(addButton, `${model.name} 页面缺少添加角色按钮，无法补足角色输入框`);
        console.info(`[Prompt Tasks Writer] 当前角色输入框数量：${inputs.length}`);
        inputs.forEach((input, index) => {
          const hasPromptButton = Array.from(input.querySelectorAll('button')).some((button) => button.textContent?.trim() === 'Prompt');
          const contentContainer = getCharacterContentContainer(input);
          const summaryButton = Array.from(input.children).find((child) => child.tagName === 'BUTTON');
          const hasRemoveButton = Boolean(findCharacterRemoveButton(input));
          this.assert(hasPromptButton, `第 ${index + 1} 个角色输入区没有 Prompt 按钮`);
          this.assert(contentContainer, `第 ${index + 1} 个角色输入区没有 Prompt 内容区域`);
          if (contentContainer.style.display === 'none') {
            this.assert(summaryButton, `第 ${index + 1} 个折叠角色输入区没有摘要展开按钮`);
          }
          this.assert(getCharacterPromptInput(input), `第 ${index + 1} 个角色输入区没有正向提示词编辑器`);
          this.assert(getCharacterPromptInput(input, true), `第 ${index + 1} 个角色输入区没有反向提示词编辑器`);
          this.assert(hasRemoveButton, `第 ${index + 1} 个角色输入区内含 5 个按钮的容器中没有第 4 个删除按钮`);
        });
      })
    );
    results.push(
      await this.test('ZIP 下载按钮接口（仅检查）', () => {
        const button = document.querySelector('#historyContainer > button');
        if (!button) this.skip('当前页面没有可用的历史记录下载按钮');
        this.assert(button instanceof HTMLElement, '下载按钮目标不是 HTMLElement');
      })
    );

    console.table(results);
    const passed = results.filter((result) => result.status === 'PASS').length;
    const failed = results.filter((result) => result.status === 'FAIL').length;
    const skipped = results.filter((result) => result.status === 'SKIP').length;
    const log = failed > 0 ? console.error : console.info;
    log(`[Prompt Tasks Writer] 测试完成：${passed} 通过，${failed} 失败，${skipped} 跳过`);
    results.filter((result) => result.status === 'FAIL').forEach((result) => console.error(`[FAIL] ${result.name}: ${result.message}`));
    console.groupEnd();
    return results;
  }
}

export { NovelPageUtilTest, type TestResult };
