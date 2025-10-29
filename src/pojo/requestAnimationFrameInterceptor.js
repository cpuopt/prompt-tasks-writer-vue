import { unsafeWindow } from '$';

class RequestAnimationFrameInterceptor {
    static originalRequestAnimationFrame = unsafeWindow.requestAnimationFrame;

    static intercept(func) {
        unsafeWindow.requestAnimationFrame = (...args) => {
            RequestAnimationFrameInterceptor.originalRequestAnimationFrame.apply(unsafeWindow, args);
            func();
        };
    }

    static stop() {
        unsafeWindow.requestAnimationFrame = RequestAnimationFrameInterceptor.originalRequestAnimationFrame;
    }

    static disable() {
        unsafeWindow.requestAnimationFrame = (...args) => {
            if (args[0].toString() === 'async t=>{e&&(this.lastFrameTime=void 0,e=!1),await this._nextFrame(t)}') {
                // 不执行彩带烟花相关动画的方法
                console.debug('RequestAnimationFrameInterceptor:不执行彩带烟花相关动画的方法');
            } else {
                RequestAnimationFrameInterceptor.originalRequestAnimationFrame.apply(unsafeWindow, args);
            }
        };
    }
}

export { RequestAnimationFrameInterceptor };
