export function actAndWaitXPath(dom_action, wait_for_ele_xpath, timeout = 10000) {
    return new Promise((resolve, reject) => {
        let timer;

        const getElement = () => document.evaluate(wait_for_ele_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        // 超时处理
        if (timeout > 0) {
            timer = setTimeout(() => reject(new Error(`Timeout waiting for element: ${wait_for_ele_xpath}`)), timeout);
        }

        // MutationObserver 监听 DOM 变化
        const mutationObserver = new MutationObserver(() => {
            const el = getElement();
            if (el) {
                clearTimeout(timer);
                mutationObserver.disconnect();
                resolve(el);
            }
        });
        mutationObserver.observe(document.body, { childList: true, subtree: true });

        // 再执行操作
        try {
            dom_action();
            const el = getElement();
            if (el) {
                clearTimeout(timer);
                mutationObserver.disconnect();
                resolve(el);
            }
        } catch (err) {
            mutationObserver.disconnect();
            clearTimeout(timer);
            reject(err);
        }
    });
}
