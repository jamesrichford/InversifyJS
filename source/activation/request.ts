///<reference path="../interfaces.d.ts" />

import { activationUtils } from "./activation_utils";
import { QueryableString } from "./queryable_string";

class Request implements IRequest {

  public guid : string;
  public index : number;
  public injectedInto : IQueryableString;
  public parentRequest : IRequest;
  public childRequests : IRequest[];
  public context : IContext;
  public target : ITarget;

  constructor(
    context : IContext,
    parentRequest? : Request,
    injectedInto? :
    string, target? : ITarget) {

      this.guid = activationUtils.guid();
      this.context = context;
      this.childRequests = null;
      this.parentRequest = parentRequest || null;
      this.injectedInto = new QueryableString(injectedInto) || null;
      this.target = target || null;
  }

}

export { Request };
