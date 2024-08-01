class CanvasInterceptor {
  static originalGetContext = HTMLCanvasElement.prototype.getContext;

  // operations = [];
  // offscreenCanvas = null;
  drawCanvas = null;
  interceptOffscreenCanvas(width, height) {
    const self = this;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      const context = CanvasInterceptor.originalGetContext.call(this, type, ...args);
      if (this.width < self.width && this.height < self.height) {
        self.width = this.width;
        self.height = this.height;
      }
      // self.offscreenCanvas !== this &&
      if (type === '2d' && this.width === width && this.height === height) {
        // 如果这是离屏Canvas，可以通过一些特征来识别
        // 例如：尺寸、特定标记或特定内容
        // console.log('self.offscreenCanvas');
        // self.offscreenCanvas = this;
        // self.offscreenCanvas.className = 'offscreenCanvas';
        // console.log('Found offscreen canvas:', this);

        // 拦截绘图方法，记录操作（可选）
        const originalMethod = context.drawImage;
        context.drawImage = function (...args) {
          if (self.drawCanvas !== args[0]) {
            self.drawCanvas = args[0];
            console.debug('成功截获offscreenCanvas', args[0]);
            // args[0].getContext('2d').drawImage(img, 0, 0);
            // self.stop();

          }

          // console.log(self.offscreenCanvas, { arguments: args });
          // operations.push({ method, arguments: args });
          return originalMethod.apply(context, args);
        };
        // self.stop();
      }
      return context;
    };
  }
  stop() {
    HTMLCanvasElement.prototype.getContext = CanvasInterceptor.originalGetContext;
  }
  // download(canvas) {
  //   const a = document.createElement('a');
  //   a.href = canvas.toDataURL();
  //   a.download = Date.now();
  //   a.click();
  // }
  draw(img) {
    console.log('将Image绘制到offscreenCanvas',this.drawCanvas);
    this.drawCanvas.getContext('2d').drawImage(img, 0, 0);
  }
}

export { CanvasInterceptor };
