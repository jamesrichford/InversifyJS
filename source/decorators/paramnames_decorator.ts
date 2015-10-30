///<reference path="../interfaces/interfaces.d.ts" />

import { Metadata } from "../activation/metadata";
import { decoratorUtils } from "./decorator_utils";

function paramnames(...paramnames : string[]) {
  return function(target: any) {
    var metadataKey = "inversify:paramnames";
    var metadataValue = paramnames || [];
    return decoratorUtils.tagParameter(metadataKey, metadataValue, target);
  }
}

export { named };
