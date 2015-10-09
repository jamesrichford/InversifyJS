///<reference path="./interfaces.d.ts" />

// Inversify
// ---------

// The Inversify main file, the library entry point.

import { Kernel } from "./kernel/kernel";
import { Binding } from "./binding/binding";
import { inject } from "./decorators/inject_decorator";
import { named } from "./decorators/named_decorator";
import { tagged } from "./decorators/tagged_decorator";

export { Kernel, Binding, inject, named, tagged };
