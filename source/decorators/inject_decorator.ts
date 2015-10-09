///<reference path="../interfaces.d.ts" />

import { Target } from "../activation/target";

// returns the name of the arguments of a function
// TODO update implementation if "design:paramnames" is supported
// https://github.com/Microsoft/TypeScript/issues/4905
function getParanNames(func : Function) : string[] {

	var fnStr, argsInit, argsEnd, result, STRIP_COMMENTS, ARGUMENT_NAMES;
	STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	ARGUMENT_NAMES = /([^\s,]+)/g;

	fnStr = func.toString().replace(STRIP_COMMENTS, '');
	argsInit = fnStr.indexOf('(') + 1;
	argsEnd = fnStr.indexOf(')');
	result = fnStr.slice(argsInit, argsEnd).match(ARGUMENT_NAMES);
	if(Array.isArray(result) === false) {
		result = []
	}
	return result;
}
/*
// returns the types of the arguments of a function
function getParanTypes(target : any) : string[] {
	var paramtypes = Reflect.getMetadata("design:paramtypes", target);
	return paramtypes.map(a => a.name);
}
*/

// Used to declare the types of the depencencies that must be injected.
// TODO: remove args when interfaze serialization support arrives
function inject(...paramTypes : string[]) {
	return function(target: any) {
		var metadataKey = "inversify:inject";
		var metadataValue = new Array<ITarget>();
		var paramNames = getParanNames(target);
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
