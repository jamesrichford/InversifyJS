///<reference path="../interfaces.d.ts" />

import { activationUtils } from "./activation_utils";

class Request implements IRequest {

  public guid : string;
  public injectedInto : string;
  public context : IContext;
  public targets : ITarget[];

  constructor(injectedInto : string, context : IContext, targets : ITarget[]) {
    this.guid = activationUtils.guid();
    this.context = context;
    this.targets = [];
  }

  public getParentRequest() {
    this.context.getPreviousRequest(this.guid);
  }

  public getChildRequest() {
    this.context.getNextRequest(this.guid);
  }

  public getIndex() {
   this.context.getRequestIndex(this.guid);
  }

}

export { Request };
