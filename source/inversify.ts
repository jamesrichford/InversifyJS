///<reference path="./interfaces.d.ts" />

// Inversify
// ---------

// The Inversify main file, the library entry point.

import { Kernel } from "./kernel/kernel";
import { Binding } from "./binding/binding";
import { inject } from "./decorators/inject_decorator";
import { named } from "./decorators/named_decorator";
import { tagged } from "./decorators/tagged_decorator";
import { decoratorUtils } from "./decorators/decorator_utils";

var decorate = decoratorUtils.decorate;

export { Kernel };
export { Binding };
export { inject };
export { named };
export { tagged };
export { decorate };
