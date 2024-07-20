class CreateObjectURLInterceptor {
  originalCreateObjectURL = URL.createObjectURL;
  imgBlobObjectURLs = [];
  record() {
    const self = this;
    URL.createObjectURL = (blob) => {
      const url = this.originalCreateObjectURL.call(this, blob);
      console.debug('createObjectURL:', url);
      self.imgBlobObjectURLs.push(url);
      return url;
    };
  }
  stop() {
    URL.createObjectURL = this.originalCreateObjectURL;
  }
  revokeAll() {
    console.debug(this.imgBlobObjectURLs);
    this.imgBlobObjectURLs.forEach((objectURL) => {
      URL.revokeObjectURL(objectURL);
    });
  }
  revokePercentage(percentage) {
    const rem = this.imgBlobObjectURLs.splice(0, Math.floor(this.imgBlobObjectURLs.length * percentage));
    console.debug(rem);
    rem.forEach((objectURL) => {
      URL.revokeObjectURL(objectURL);
    });
  }
}

export { CreateObjectURLInterceptor };
