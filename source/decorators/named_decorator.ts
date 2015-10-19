///<reference path="../interfaces.d.ts" />

import { Metadata } from "../activation/metadata";
import { decoratorUtils } from "./decorator_utils";

// Used to add named metadata which is used to resolve name-based contextual bindings.
function named(name : string) {
  return function(target: any, targetKey : string, index : number) {
    var metadata = new Metadata("named", name);
    return decoratorUtils.tagParameter(target, targetKey, index, metadata);
  }
}

export { named };
