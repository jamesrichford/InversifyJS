///<reference path="../interfaces.d.ts" />

import { decoratorUtils } from "../decorators/decorator_utils";
import { Requests } from "../activation/target";
import { Target } from "../activation/target";

class Planner implements IPlanner {

  // Takes a context and root requests and returns a full context
  public getRequestTree(rootRequest : Request) : IRequest {
    // TODO
    return rootRequest;
  }

}

export { Planner };
