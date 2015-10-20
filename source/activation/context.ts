///<reference path="../interfaces.d.ts" />

import { activationUtils } from "./activation_utils";

class Context implements IContext {

  public kernel : IKernel;
  private requests : IRequest[];

  constructor(kernel : IKernel) {
    this.guid = activationUtils.guid();
    this.kernel = kernel;
    this.requests = [];
  }

  public addRequest(IRequest request) {
    // add reference, so context can be accessed from a request
    request.context = this;
    this.requests.push(request);
  }

  public getRequest(index : number) {
    this.requests[i];
  }

  public getLength() {
    this.requests.length;
  }

}

export { Context };
