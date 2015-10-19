///<reference path="../interfaces.d.ts" />

import { Target } from "../activation/target";
import { decoratorUtils } from "./decorator_utils";

// Used to declare the types of the depencencies that must be injected.
// TODO: remove args when interfaze serialization support arrives
function inject(...paramTypes : string[]) {
  return function(target: any) {
    var metadataKey = "inversify:inject";
    var metadataValue = new Array<ITarget>();
    var paramNames = decoratorUtils.getParanNames(target);
    // TODO: use reflection when interfaze serialization support arrives
    // var paramTypes = getParanTypes(target);

    if(Reflect.hasOwnMetadata(metadataKey, target) === true) {
      throw new Error("Cannot apply @inject decorator multiple times.");
    }

    if(paramNames.length !== paramTypes.length) {
      throw new Error("The number of types to be injected do not match the number of constructor arguments.");
    }

    // create list of targets
    var tags : IMetadata[] = Reflect.getMetadata("inversify:tagged", target);
    for(var i = 0; i < paramNames.length; i++) {
      var targetDetails = new Target(paramNames[i], paramTypes[i]);
      if(typeof tags === "object") {
        var targetMetadata = tags[i.toString()];
        if(Array.isArray(targetMetadata) === true) {
          targetDetails.metadata = targetMetadata;
        }
      }
      metadataValue.push(targetDetails);
    }

    // save list of targets as metadata
    Reflect.defineMetadata(metadataKey, metadataValue, target);

    // remove duplicated metadata
    Reflect.deleteMetadata("inversify:tagged", target);

    return target;
  }
}

export { inject };
