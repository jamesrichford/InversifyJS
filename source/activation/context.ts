///<reference path="../interfaces.d.ts" />

class Context implements IContext {
  public kernel : IKernel;
  public request : IRequest;

  constructor(kernel : IKernel, request : IRequest) {
	  this.kernel = kernel;
	  this.request = request;
  }
}

export { Context };
