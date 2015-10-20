/**
 * inversify v.1.0.0 - A lightweight IoC container written in TypeScript.
 * Copyright (c) 2015 Remo H. Jansen <remo.jansen@wolksoftware.com> (http://www.remojansen.com/)
 * MIT inversify.io/LICENSE
 * http://inversify.io
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.inversify = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    return Metadata;
})();
exports.Metadata = Metadata;

},{}],2:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var metadata_1 = require("./metadata");
var Target = (function () {
    function Target(name, type, namedOrTagged) {
        this.name = name;
        this.type = type;
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata("named", namedOrTagged);
        }
        else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
        }
        if (metadataItem !== null) {
            this.metadata.push(metadataItem);
        }
    }
    Target.prototype.isArray = function () {
        return (this.type.indexOf("[]") != -1);
    };
    Target.prototype.isNamed = function () {
        for (var i = 0; i < this.metadata.length; i++) {
            var m = this.metadata[i];
            if (m.key === "named") {
                return true;
            }
        }
        return false;
    };
    Target.prototype.isTagged = function () {
        for (var i = 0; i < this.metadata.length; i++) {
            var m = this.metadata[i];
            if (m.key !== "named") {
                return true;
            }
        }
        return false;
    };
    Target.prototype.matchesName = function (name) {
        for (var i = 0; i < this.metadata.length; i++) {
            var m = this.metadata[i];
            if (m.key === "named" && m.value === name) {
                return true;
            }
        }
        return false;
    };
    Target.prototype.matchesTag = function (metadata) {
        for (var i = 0; i < this.metadata.length; i++) {
            var m = this.metadata[i];
            if (m.key === metadata.key && m.value === metadata.value) {
                return true;
            }
        }
        return false;
    };
    return Target;
})();
exports.Target = Target;

},{"./metadata":1}],3:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var binding_scope_enum_1 = require("./binding_scope_enum");
var binding_result_enum_1 = require("./binding_result_enum");
var metadata_1 = require("../activation/metadata");
var Binding = (function () {
    function Binding(runtimeIdentifier) {
        this.runtimeIdentifier = runtimeIdentifier;
        this.cache = null;
        this.scope = binding_scope_enum_1.BindingScopeEnum.Transient;
        this.resolveAs = binding_result_enum_1.BindingResultEnum.Instance;
        this.metadata = new Array();
    }
    Binding.prototype.to = function (implementationType) {
        this.implementationType = implementationType;
        this.resolveAs = binding_result_enum_1.BindingResultEnum.Instance;
        return this;
    };
    Binding.prototype.toValue = function (value) {
        this.value = value;
        this.resolveAs = binding_result_enum_1.BindingResultEnum.Value;
        return this;
    };
    Binding.prototype.toConstructor = function (implementationType) {
        this.implementationType = implementationType;
        this.resolveAs = binding_result_enum_1.BindingResultEnum.Constructor;
        return this;
    };
    Binding.prototype.toFactory = function (implementationType) {
        this.implementationType = implementationType;
        this.resolveAs = binding_result_enum_1.BindingResultEnum.Factory;
        return this;
    };
    Binding.prototype.toPromise = function (implementationType) {
        this.implementationType = implementationType;
        this.resolveAs = binding_result_enum_1.BindingResultEnum.Promise;
        return this;
    };
    Binding.prototype.named = function (name) {
        var m = new metadata_1.Metadata("named", name);
        this.metadata.push(m);
        return this;
    };
    Binding.prototype.withMetadata = function (tag, value) {
        var m = new metadata_1.Metadata(tag, value);
        this.metadata.push(m);
        return this;
    };
    Binding.prototype.withConstructorArgument = function (name, value) {
        return this;
    };
    Binding.prototype.withPropertyValue = function (name, value) {
        return this;
    };
    Binding.prototype.withParameter = function () {
        return this;
    };
    Binding.prototype.when = function (constraint) {
        this.whenConstraint = constraint;
        return this;
    };
    Binding.prototype.whenInjectedInto = function (target) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.whenInjectedExactlyInto = function (target) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.whenParentNamed = function (name) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.whenAnyAnchestorNamed = function (name) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.whenNoAnchestorNamed = function (name) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.whenAnyAnchestorMatches = function (regex) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.whenNoAnchestorMatches = function (regex) {
        this.whenConstraint = function (request) {
            return false;
        };
        return this;
    };
    Binding.prototype.onActivation = function (cb) {
        this.onActivationCallback = cb;
        return this;
    };
    Binding.prototype.onDeactivation = function (cb) {
        this.onDeactivationCallback = cb;
        return this;
    };
    Binding.prototype.inTransientScope = function () {
        this.scope = binding_scope_enum_1.BindingScopeEnum.Transient;
        return this;
    };
    Binding.prototype.inSingletonScope = function () {
        this.scope = binding_scope_enum_1.BindingScopeEnum.Singleton;
        return this;
    };
    return Binding;
})();
exports.Binding = Binding;

},{"../activation/metadata":1,"./binding_result_enum":4,"./binding_scope_enum":5}],4:[function(require,module,exports){
var BindingResultEnum;
(function (BindingResultEnum) {
    BindingResultEnum[BindingResultEnum["Instance"] = 0] = "Instance";
    BindingResultEnum[BindingResultEnum["Value"] = 1] = "Value";
    BindingResultEnum[BindingResultEnum["Constructor"] = 2] = "Constructor";
    BindingResultEnum[BindingResultEnum["Factory"] = 3] = "Factory";
    BindingResultEnum[BindingResultEnum["Promise"] = 4] = "Promise";
})(BindingResultEnum || (BindingResultEnum = {}));
exports.BindingResultEnum = BindingResultEnum;

},{}],5:[function(require,module,exports){
var BindingScopeEnum;
(function (BindingScopeEnum) {
    BindingScopeEnum[BindingScopeEnum["Transient"] = 0] = "Transient";
    BindingScopeEnum[BindingScopeEnum["Singleton"] = 1] = "Singleton";
})(BindingScopeEnum || (BindingScopeEnum = {}));
exports.BindingScopeEnum = BindingScopeEnum;

},{}],6:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var DecoratorUtils = (function () {
    function DecoratorUtils() {
    }
    DecoratorUtils.prototype.getParanNames = function (func) {
        var fnStr, argsInit, argsEnd, result, STRIP_COMMENTS, ARGUMENT_NAMES;
        STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        ARGUMENT_NAMES = /([^\s,]+)/g;
        fnStr = func.toString().replace(STRIP_COMMENTS, '');
        argsInit = fnStr.indexOf('(') + 1;
        argsEnd = fnStr.indexOf(')');
        if ('function' === typeof Map &&
            fnStr.indexOf("class") !== -1 &&
            fnStr.indexOf("constructor") === -1) {
            result = null;
        }
        else {
            result = fnStr.slice(argsInit, argsEnd).match(ARGUMENT_NAMES);
        }
        if (Array.isArray(result) === false) {
            result = [];
        }
        return result;
    };
    DecoratorUtils.prototype.tagParameter = function (target, targetKey, index, metadata) {
        var metadataKey = "inversify:tagged";
        var paramsMetadata = null;
        if (targetKey !== undefined) {
            var msg = "The @tagged and @named decorator must be applied to the parameters of a constructor.";
            throw new Error(msg);
        }
        if (Reflect.hasOwnMetadata(metadataKey, target) !== true) {
            paramsMetadata = {};
        }
        else {
            paramsMetadata = Reflect.getMetadata(metadataKey, target);
        }
        var paramMetadata = paramsMetadata[index.toString()];
        if (Array.isArray(paramMetadata) !== true) {
            paramMetadata = [];
        }
        else {
            for (var i = 0; i < paramMetadata.length; i++) {
                var m = paramMetadata[i];
                if (m.key === metadata.key) {
                    throw new Error("Metadadata key " + m.key + " was used more than once in a parameter.");
                }
            }
        }
        paramMetadata.push(metadata);
        paramsMetadata[index.toString()] = paramMetadata;
        Reflect.defineMetadata(metadataKey, paramsMetadata, target);
        return target;
    };
    DecoratorUtils.prototype._decorate = function (decorators, target) {
        Reflect.decorate(decorators, target);
    };
    DecoratorUtils.prototype._param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    };
    DecoratorUtils.prototype.decorate = function (decorator, target, parameterIndex) {
        if (typeof parameterIndex === "number") {
            return this._decorate([this._param(parameterIndex, decorator)], target);
        }
        else {
            return this._decorate([decorator], target);
        }
    };
    return DecoratorUtils;
})();
var decoratorUtils = new DecoratorUtils();
exports.decoratorUtils = decoratorUtils;

},{}],7:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var target_1 = require("../activation/target");
var decorator_utils_1 = require("./decorator_utils");
function inject() {
    var paramTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paramTypes[_i - 0] = arguments[_i];
    }
    return function (target) {
        var metadataKey = "inversify:inject";
        var metadataValue = new Array();
        var paramNames = decorator_utils_1.decoratorUtils.getParanNames(target);
        if (Reflect.hasOwnMetadata(metadataKey, target) === true) {
            throw new Error("Cannot apply @inject decorator multiple times.");
        }
        if (paramNames.length !== paramTypes.length) {
            throw new Error("The number of types to be injected do not match the number of constructor arguments.");
        }
        var tags = Reflect.getMetadata("inversify:tagged", target);
        for (var i = 0; i < paramNames.length; i++) {
            var targetDetails = new target_1.Target(paramNames[i], paramTypes[i]);
            if (typeof tags === "object") {
                var targetMetadata = tags[i.toString()];
                if (Array.isArray(targetMetadata) === true) {
                    targetDetails.metadata = targetMetadata;
                }
            }
            metadataValue.push(targetDetails);
        }
        Reflect.defineMetadata(metadataKey, metadataValue, target);
        Reflect.deleteMetadata("inversify:tagged", target);
        return target;
    };
}
exports.inject = inject;

},{"../activation/target":2,"./decorator_utils":6}],8:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var metadata_1 = require("../activation/metadata");
var decorator_utils_1 = require("./decorator_utils");
function named(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata("named", name);
        return decorator_utils_1.decoratorUtils.tagParameter(target, targetKey, index, metadata);
    };
}
exports.named = named;

},{"../activation/metadata":1,"./decorator_utils":6}],9:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var metadata_1 = require("../activation/metadata");
var decorator_utils_1 = require("./decorator_utils");
function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
        return decorator_utils_1.decoratorUtils.tagParameter(target, targetKey, index, metadata);
    };
}
exports.tagged = tagged;

},{"../activation/metadata":1,"./decorator_utils":6}],10:[function(require,module,exports){
///<reference path="./interfaces.d.ts" />
var kernel_1 = require("./kernel/kernel");
exports.Kernel = kernel_1.Kernel;
var binding_1 = require("./binding/binding");
exports.Binding = binding_1.Binding;
var inject_decorator_1 = require("./decorators/inject_decorator");
exports.inject = inject_decorator_1.inject;
var named_decorator_1 = require("./decorators/named_decorator");
exports.named = named_decorator_1.named;
var tagged_decorator_1 = require("./decorators/tagged_decorator");
exports.tagged = tagged_decorator_1.tagged;
var decorator_utils_1 = require("./decorators/decorator_utils");
var decorate = decorator_utils_1.decoratorUtils.decorate;
exports.decorate = decorate;

},{"./binding/binding":3,"./decorators/decorator_utils":6,"./decorators/inject_decorator":7,"./decorators/named_decorator":8,"./decorators/tagged_decorator":9,"./kernel/kernel":11}],11:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var lookup_1 = require("./lookup");
var target_1 = require("../activation/target");
var resolver_1 = require("./resolver");
var Kernel = (function () {
    function Kernel() {
        this._bindingDictionary = new lookup_1.Lookup();
        this._resolver = new resolver_1.Resolver();
    }
    Kernel.prototype.bind = function (typeBinding) {
        this._bindingDictionary.add(typeBinding.runtimeIdentifier, typeBinding);
    };
    Kernel.prototype.unbind = function (runtimeIdentifier) {
        try {
            this._bindingDictionary.remove(runtimeIdentifier);
        }
        catch (e) {
            throw new Error("Could not resolve service " + runtimeIdentifier);
        }
    };
    Kernel.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Kernel.prototype.resolve = function (runtimeIdentifier) {
        var target = new target_1.Target(runtimeIdentifier, null, null);
        return this._resolve(target);
    };
    Kernel.prototype.resolveNamed = function (runtimeIdentifier, named) {
        var target = new target_1.Target(runtimeIdentifier, null, named);
        return this._resolve(target);
    };
    Kernel.prototype.resolveWithMetadata = function (runtimeIdentifier, tagged) {
        var target = new target_1.Target(runtimeIdentifier, null, tagged);
        return this._resolve(target);
    };
    Kernel.prototype._resolve = function (target) {
        return this._resolver.get(this._bindingDictionary, target);
    };
    return Kernel;
})();
exports.Kernel = Kernel;

},{"../activation/target":2,"./lookup":12,"./resolver":13}],12:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var KeyValuePair = (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = new Array();
        this.value.push(value);
    }
    return KeyValuePair;
})();
var Lookup = (function () {
    function Lookup() {
        this._hashMap = new Array();
    }
    Lookup.prototype.getIndexByKey = function (key) {
        var index = -1;
        for (var i = 0; i < this._hashMap.length; i++) {
            var keyValuePair = this._hashMap[i];
            if (keyValuePair.key === key) {
                index = i;
            }
        }
        return index;
    };
    Lookup.prototype.add = function (key, value) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        if (value === null || value === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            var keyValuePair = this._hashMap[index];
            if (keyValuePair.key === key) {
                keyValuePair.value.push(value);
            }
        }
        else {
            this._hashMap.push(new KeyValuePair(key, value));
        }
    };
    Lookup.prototype.get = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            var keyValuePair = this._hashMap[index];
            if (keyValuePair.key === key) {
                return keyValuePair.value;
            }
        }
        else {
            throw new Error("Key Not Found");
        }
    };
    Lookup.prototype.remove = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            this._hashMap.splice(index, 1);
        }
        else {
            throw new Error("Key Not Found");
        }
    };
    Lookup.prototype.hasKey = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            return true;
        }
        else {
            return false;
        }
    };
    return Lookup;
})();
exports.Lookup = Lookup;

},{}],13:[function(require,module,exports){
///<reference path="../interfaces.d.ts" />
var binding_scope_enum_1 = require("../binding/binding_scope_enum");
var decorator_utils_1 = require("../decorators/decorator_utils");
var Resolver = (function () {
    function Resolver() {
    }
    Resolver.prototype.hasDependencies = function (func) {
        return (decorator_utils_1.decoratorUtils.getParanNames(func).length !== 0);
    };
    Resolver.prototype.getMetadata = function (target) {
        var metadataKey = "inversify:inject";
        var metada = Reflect.getMetadata(metadataKey, target);
        return metada;
    };
    Resolver.prototype.injectDependencies = function (bindingDictionary, func) {
        // var args = this._getConstructorArguments(func);
        var hasConstructorArguments = this.hasDependencies(func);
        if (hasConstructorArguments === false) {
            return new func();
        }
        else {
            var injections = [], implementation = null;
            var metadata = this.getMetadata(func);
            for (var i = 0; i < metadata.length; i++) {
                implementation = this.get(bindingDictionary, metadata[i]);
                injections.push(implementation);
            }
            return this.construct(func, injections);
        }
    };
    Resolver.prototype.construct = function (constr, args) {
        return new (Function.prototype.bind.apply(constr, [null].concat(args)));
    };
    Resolver.prototype.get = function (bindingDictionary, target) {
        var bindings;
        if (bindingDictionary.hasKey(target.type)) {
            bindings = bindingDictionary.get(target.type);
        }
        else {
            return null;
        }
        if (bindings.length > 0) {
            if (target.isArray()) {
            }
            else {
                if (target.isNamed()) {
                }
                else {
                    if (target.isTagged()) {
                    }
                    else {
                    }
                }
            }
        }
        else {
            var binding = bindings[0];
        }
        if ((binding.scope === binding_scope_enum_1.BindingScopeEnum.Singleton) && (binding.cache !== null)) {
            return binding.cache;
        }
        else {
            var result = this.injectDependencies(bindingDictionary, binding.implementationType);
            binding.cache = result;
            return result;
        }
    };
    return Resolver;
})();
exports.Resolver = Resolver;

},{"../binding/binding_scope_enum":5,"../decorators/decorator_utils":6}]},{},[10])(10)
});