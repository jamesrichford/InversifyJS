///<reference path="../interfaces.d.ts" />

import { Metadata } from "../activation/metadata";
import { decoratorUtils } from "./decorator_utils";

// Used to add custom metadata which is used to resolve metadata-based contextual bindings.
function tagged(metadataKey : string, metadataValue : any) {
	return function(target: any, targetKey : string, index : number) {
		var metadata = new Metadata(metadataKey, metadataValue);
		return decoratorUtils.tagParameter(target, targetKey, index, metadata);
	}
}

export { tagged };
