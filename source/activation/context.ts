///<reference path="../interfaces.d.ts" />

import { activationUtils } from "./activation_utils";
import { Request } from "./request";

class Context implements IContext {

  public guid : string;
  public depth : number;
  public kernel : IKernel;
  public rootRequest : IRequest;

  // The context provides access to the kernel and the root node in the requests tree
  constructor(kernel : IKernel) {
    this.guid = activationUtils.guid();
    this.kernel = kernel;
    this.depth = 0;
    this.rootRequest = null;
  }

  // Sets the root requests
  public initialize(rootRequest : IRequest) {
    this.rootRequest = rootRequest;
  }

  // Removes context/request and requests/child-request circular dependencies
  public dispose() {
    this.rootRequest.dispose();
    this.rootRequest = null;
  }

}

export { Context };
