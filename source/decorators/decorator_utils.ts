///<reference path="../interfaces.d.ts" />

import { Target } from "../activation/target";

class DecoratorUtils implements IDecoratorUtils {

  public tagParameter(target: any, targetKey : string, index : number, metadata : IMetadata) {
		var metadataKey = "inversify:tagged";
		var paramsMetadata : Object = null;

		// this decorator can be used in a constructor not a method
		if(targetKey !== undefined) {
      var msg = "The @tagged and @named decorator must be applied to the parameters of a constructor.";
			throw new Error(msg);
		}

		// read metadata if avalible
		if(Reflect.hasOwnMetadata(metadataKey, target) !== true) {
			paramsMetadata = {};
		}
		else {
			paramsMetadata = Reflect.getMetadata(metadataKey, target);
		}

		// get metadata for the decorated parameter by its index
		var paramMetadata : IMetadata[] = paramsMetadata[index.toString()];
		if(Array.isArray(paramMetadata) !== true) {
			paramMetadata = [];
		}
		else {
			for(var i = 0; i < paramMetadata.length; i++) {
				var m : IMetadata = paramMetadata[i];
				if(m.key === metadata.key) {
					throw new Error(`Metadadata key ${m.key} was used more than once in a parameter.`);
				}
			}
		}

		// set metadata
		paramMetadata.push(metadata);
    paramsMetadata[index.toString()] = paramMetadata;
		Reflect.defineMetadata(metadataKey, paramsMetadata, target);
		return target;
  }
}

var decoratorUtils = new DecoratorUtils();
export { decoratorUtils };
