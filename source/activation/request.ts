///<reference path="../interfaces.d.ts" />

class Request implements IRequest {
  public context : IContext;
  public parentRequest : IRequest;

  constructor(context : IContext, parentRequest? : IRequest) {
	  this.context = context;
	  this.parentRequest = parentRequest || null;
  }
}

export { Request };
