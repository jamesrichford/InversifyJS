!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.inversify=t()}}(function(){return function t(e,n,r){function i(a,u){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[a]={exports:{}};e[a][0].call(d.exports,function(t){var n=e[a][1][t];return i(n?n:t)},d,d.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){var r=function(){function t(t,e){this.key=t,this.value=e}return t}();n.Metadata=r},{}],2:[function(t,e,n){var r=t("./metadata"),i=function(){function t(t,e,n){this.name=t,this.type=e,this.metadata=new Array;var i=null;"string"==typeof n?i=new r.Metadata("named",n):n instanceof r.Metadata&&(i=n),null!==i&&this.metadata.push(i)}return t.prototype.isArray=function(){return-1!=this.type.indexOf("[]")},t.prototype.isNamed=function(){for(var t=0;t<this.metadata.length;t++){var e=this.metadata[t];if("named"===e.key)return!0}return!1},t.prototype.isTagged=function(){for(var t=0;t<this.metadata.length;t++){var e=this.metadata[t];if("named"!==e.key)return!0}return!1},t.prototype.matchesName=function(t){for(var e=0;e<this.metadata.length;e++){var n=this.metadata[e];if("named"===n.key&&n.value===t)return!0}return!1},t.prototype.matchesTag=function(t){for(var e=0;e<this.metadata.length;e++){var n=this.metadata[e];if(n.key===t.key&&n.value===t.value)return!0}return!1},t}();n.Target=i},{"./metadata":1}],3:[function(t,e,n){var r=t("./binding_scope_enum"),i=t("./binding_result_enum"),o=t("../activation/metadata"),a=function(){function t(t){this.runtimeIdentifier=t,this.cache=null,this.scope=r.BindingScopeEnum.Transient,this.resolveAs=i.BindingResultEnum.Instance,this.metadata=new Array}return t.prototype.to=function(t){return this.implementationType=t,this.resolveAs=i.BindingResultEnum.Instance,this},t.prototype.toValue=function(t){return this.cache=t,this.resolveAs=i.BindingResultEnum.Value,this},t.prototype.toConstructor=function(t){return this.implementationType=t,this.resolveAs=i.BindingResultEnum.Constructor,this},t.prototype.toProvider=function(t){return this.implementationType=t,this.resolveAs=i.BindingResultEnum.Provider,this},t.prototype.named=function(t){var e=new o.Metadata("named",t);return this.metadata.push(e),this},t.prototype.withMetadata=function(t,e){var n=new o.Metadata(t,e);return this.metadata.push(n),this},t.prototype.withConstructorArgument=function(t,e){return this},t.prototype.withPropertyValue=function(t,e){return this},t.prototype.withParameter=function(){return this},t.prototype.when=function(t){return this.whenConstraint=t,this},t.prototype.whenInjectedInto=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.whenInjectedExactlyInto=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.whenParentNamed=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.whenAnyAnchestorNamed=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.whenNoAnchestorNamed=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.whenAnyAnchestorMatches=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.whenNoAnchestorMatches=function(t){return this.whenConstraint=function(t){return!1},this},t.prototype.onActivation=function(t){return this.onActivationCallback=t,this},t.prototype.onDeactivation=function(t){return this.onDeactivationCallback=t,this},t.prototype.inTransientScope=function(){return this.scope=r.BindingScopeEnum.Transient,this},t.prototype.inSingletonScope=function(){return this.scope=r.BindingScopeEnum.Singleton,this},t}();n.Binding=a},{"../activation/metadata":1,"./binding_result_enum":4,"./binding_scope_enum":5}],4:[function(t,e,n){var r;!function(t){t[t.Instance=0]="Instance",t[t.Value=1]="Value",t[t.Constructor=2]="Constructor",t[t.Provider=3]="Provider"}(r||(r={})),n.BindingResultEnum=r},{}],5:[function(t,e,n){var r;!function(t){t[t.Transient=0]="Transient",t[t.Singleton=1]="Singleton"}(r||(r={})),n.BindingScopeEnum=r},{}],6:[function(t,e,n){var r=function(){function t(){}return t.prototype.tagParameter=function(t,e,n,r){var i="inversify:tagged",o=null;if(void 0!==e){var a="The @tagged and @named decorator must be applied to the parameters of a constructor.";throw new Error(a)}o=Reflect.hasOwnMetadata(i,t)!==!0?{}:Reflect.getMetadata(i,t);var u=o[n.toString()];if(Array.isArray(u)!==!0)u=[];else for(var s=0;s<u.length;s++){var c=u[s];if(c.key===r.key)throw new Error("Metadadata key "+c.key+" was used more than once in a parameter.")}return u.push(r),o[n.toString()]=u,Reflect.defineMetadata(i,o,t),t},t.prototype._decorate=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)return Reflect.decorate(t,e);switch(arguments.length){case 2:return t.reduceRight(function(t,e){return e&&e(t)||t},e)}},t.prototype._param=function(t,e){return function(n,r){e(n,r,t)}},t.prototype.applyDecorate=function(t,e,n){"number"==typeof n?this._decorate([this._param(0,t)],e):"number"==typeof n&&this._decorate([t],e)},t}(),i=new r;n.decoratorUtils=i},{}],7:[function(t,e,n){function r(t){var e,n,r,i,o,a;return o=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,a=/([^\s,]+)/g,e=t.toString().replace(o,""),n=e.indexOf("(")+1,r=e.indexOf(")"),i=e.slice(n,r).match(a),Array.isArray(i)===!1&&(i=[]),i}function i(){for(var t=[],e=0;e<arguments.length;e++)t[e-0]=arguments[e];return function(e){var n="inversify:inject",i=new Array,a=r(e);if(Reflect.hasOwnMetadata(n,e)===!0)throw new Error("Cannot apply @inject decorator multiple times.");if(a.length!==t.length)throw new Error("The number of types to be injected do not match the number of constructor arguments.");for(var u=Reflect.getMetadata("inversify:tagged",e),s=0;s<a.length;s++){var c=new o.Target(a[s],t[s]);if("object"==typeof u){var d=u[s.toString()];Array.isArray(d)===!0&&(c.metadata=d)}i.push(c)}return Reflect.defineMetadata(n,i,e),Reflect.deleteMetadata("inversify:tagged",e),e}}var o=t("../activation/target");n.inject=i},{"../activation/target":2}],8:[function(t,e,n){function r(t){return function(e,n,r){var a=new i.Metadata("named",t);return o.decoratorUtils.tagParameter(e,n,r,a)}}var i=t("../activation/metadata"),o=t("./decorator_utils");n.named=r},{"../activation/metadata":1,"./decorator_utils":6}],9:[function(t,e,n){function r(t,e){return function(n,r,a){var u=new i.Metadata(t,e);return o.decoratorUtils.tagParameter(n,r,a,u)}}var i=t("../activation/metadata"),o=t("./decorator_utils");n.tagged=r},{"../activation/metadata":1,"./decorator_utils":6}],10:[function(t,e,n){var r=t("./kernel/kernel");n.Kernel=r.Kernel;var i=t("./binding/binding");n.Binding=i.Binding;var o=t("./decorators/inject_decorator");n.inject=o.inject;var a=t("./decorators/named_decorator");n.named=a.named;var u=t("./decorators/tagged_decorator");n.tagged=u.tagged},{"./binding/binding":3,"./decorators/inject_decorator":7,"./decorators/named_decorator":8,"./decorators/tagged_decorator":9,"./kernel/kernel":12}],11:[function(t,e,n){var r=t("../binding/binding_scope_enum"),i=function(){function t(){}return t.prototype.hasDependencies=function(t){var e,n,r,i,o,a;return o=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,a=/([^\s,]+)/g,e=t.toString().replace(o,""),n=e.indexOf("(")+1,r=e.indexOf(")"),i=e.slice(n,r).match(a),null===i&&(i=[]),!(0===i.length)},t.prototype.getMetadata=function(t){var e="inversify:inject",n=Reflect.getMetadata(e,t);return n},t.prototype.injectDependencies=function(t,e){var n=this.hasDependencies(e);if(n===!1)return new e;for(var r=[],i=null,o=this.getMetadata(e),a=0;a<o.length;a++)i=this.get(t,o[a]),r.push(i);return this.construct(e,r)},t.prototype.construct=function(t,e){function n(){t.apply(this,e)}return n.prototype=t.prototype,new n},t.prototype.get=function(t,e){var n;if(!t.hasKey(e.type))return null;if(n=t.get(e.type),n.length>0)e.isArray()||e.isNamed()||e.isTagged();else var i=n[0];if(i.scope===r.BindingScopeEnum.Singleton&&null!==i.cache)return i.cache;var o=this.injectDependencies(t,i.implementationType);return i.cache=o,o},t}();n.BindingResolver=i},{"../binding/binding_scope_enum":5}],12:[function(t,e,n){var r=t("./lookup"),i=t("../activation/target"),o=t("./binding_resolver"),a=function(){function t(){this._bindingDictionary=new r.Lookup,this._bindingResolver=new o.BindingResolver}return t.prototype.bind=function(t){this._bindingDictionary.add(t.runtimeIdentifier,t)},t.prototype.unbind=function(t){try{this._bindingDictionary.remove(t)}catch(e){throw new Error("Could not resolve service "+t)}},t.prototype.unbindAll=function(){this._bindingDictionary=new r.Lookup},t.prototype.resolve=function(t){var e=new i.Target(t,null,null);return this._resolve(e)},t.prototype.resolveNamed=function(t,e){var n=new i.Target(t,null,e);return this._resolve(n)},t.prototype.resolveWithMetadata=function(t,e){var n=new i.Target(t,null,e);return this._resolve(n)},t.prototype._resolve=function(t){return this._bindingResolver.get(this._bindingDictionary,t)},t}();n.Kernel=a},{"../activation/target":2,"./binding_resolver":11,"./lookup":13}],13:[function(t,e,n){var r=function(){function t(t,e){this.key=t,this.value=new Array,this.value.push(e)}return t}(),i=function(){function t(){this._hashMap=new Array}return t.prototype.getIndexByKey=function(t){for(var e=-1,n=0;n<this._hashMap.length;n++){var r=this._hashMap[n];r.key===t&&(e=n)}return e},t.prototype.add=function(t,e){if(null===t||void 0===t)throw new Error("Argument Null");if(null===e||void 0===e)throw new Error("Argument Null");var n=this.getIndexByKey(t);if(-1!==n){var i=this._hashMap[n];i.key===t&&i.value.push(e)}else this._hashMap.push(new r(t,e))},t.prototype.get=function(t){if(null===t||void 0===t)throw new Error("Argument Null");var e=this.getIndexByKey(t);if(-1===e)throw new Error("Key Not Found");var n=this._hashMap[e];return n.key===t?n.value:void 0},t.prototype.remove=function(t){if(null===t||void 0===t)throw new Error("Argument Null");var e=this.getIndexByKey(t);if(-1===e)throw new Error("Key Not Found");this._hashMap.splice(e,1)},t.prototype.hasKey=function(t){if(null===t||void 0===t)throw new Error("Argument Null");var e=this.getIndexByKey(t);return-1!==e?!0:!1},t}();n.Lookup=i},{}]},{},[10])(10)});