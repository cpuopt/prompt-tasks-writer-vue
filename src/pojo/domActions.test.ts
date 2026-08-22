// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { actAndWaitXPath } from './domActions';

describe('actAndWaitXPath DOM 操作与等待', () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('执行操作并返回同步出现的目标元素', async () => {
    const action = vi.fn(() => document.body.insertAdjacentHTML('beforeend', '<button>Ready</button>'));

    const result = await actAndWaitXPath(action, "//button[text()='Ready']");

    expect(action).toHaveBeenCalledOnce();
    expect((result as HTMLElement).textContent).toBe('Ready');
  });

  it('通过 MutationObserver 等待异步出现的目标元素', async () => {
    vi.useFakeTimers();
    const action = vi.fn(() => {
      setTimeout(() => document.body.insertAdjacentHTML('beforeend', '<div id="async-target"></div>'), 50);
    });

    const operation = actAndWaitXPath(action, "//div[@id='async-target']");
    await vi.advanceTimersByTimeAsync(50);

    await expect(operation).resolves.toBe(document.querySelector('#async-target'));
  });

  it('DOM 操作抛错时拒绝 Promise 并停止等待', async () => {
    const error = new Error('click failed');

    await expect(actAndWaitXPath(() => {
      throw error;
    }, '//button')).rejects.toBe(error);
  });

  it('目标元素始终未出现时按超时时间拒绝', async () => {
    vi.useFakeTimers();
    const operation = actAndWaitXPath(() => undefined, '//button', 100);
    const rejection = expect(operation).rejects.toThrow('Timeout waiting for element: //button');
    await vi.advanceTimersByTimeAsync(100);

    await rejection;
  });
});
