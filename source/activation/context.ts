///<reference path="../interfaces.d.ts" />

import { activationUtils } from "./activation_utils";
import { Request } from "./request";

class Context implements IContext {

  public guid : string;
  public depth : number;
  public kernel : IKernel;
  public rootRequest : IRequest;

  constructor(kernel : IKernel) {
    this.guid = activationUtils.guid();
    this.kernel = kernel;
    this.rootRequest = null;
  }

  public dispose() : void {
    // clear requests graph
  }

}

export { Context };
