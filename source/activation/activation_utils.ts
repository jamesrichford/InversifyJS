///<reference path="../interfaces.d.ts" />

class ActivationUtils implements IActivationUtils {

  private s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  public guid() : string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
          this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

}

var activationUtils = new ActivationUtils();

export { activationUtils };
