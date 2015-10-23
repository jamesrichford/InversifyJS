///<reference path="../interfaces.d.ts" />

import { activationUtils } from "./activation_utils";
import { QueryableString } from "./queryable_string";

class Request implements IRequest {

  public guid : string;
  public depth : number;
  public injectedInto : IQueryableString;
  public parentRequest : IRequest;
  public childRequests : IRequest[];
  public context : IContext;
  public target : ITarget;

  // The initial requests in a request tree may have
  // no parentRequest, Target or injectedInto values
  constructor(
    context : IContext,
    parentRequest? : Request,
    injectedInto? : string,
    target? : ITarget) {

      this.guid = activationUtils.guid();
      this.context = context;
      this.childRequests = null;
      this.parentRequest = parentRequest || null;
      this.injectedInto = new QueryableString(injectedInto) || null;
      this.target = target || null;
  }

  // Adds a new requests (node) to the tree
  // child requests must have parentRequest, Target and injectedInto values
  public addChildRequest(target : ITarget, injectedInto : string) {
    var childRequest = new Request(this.context, this, injectedInto, target);
    this.childRequests.push(childRequest);
  }

  // Identifies if the requests is a node with no children
  public isLeaf() {
    return this.childRequests.length > 0;
  }

  // removes context/request and requests/child-request circular dependencies
  public dispose() {
    for(var i = 0; i < this.childRequests.length; i++) {
      this.childRequests[i].dispose();
    }
    this.context = null;
    this.childRequests = null;
    this.parentRequest = null;
    this.context = null;
    this.target = null;
  }

}

export { Request };
