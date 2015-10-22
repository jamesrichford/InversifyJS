///<reference path="../interfaces.d.ts" />

import { BindingScopeEnum } from "../binding/binding_scope_enum";
import { decoratorUtils } from "../decorators/decorator_utils";
import { Target } from "../activation/target";

class Resolver implements IResolver {

  // Take a function as argument and discovers
  // the names of its arguments at run-time
  // used to validate that metadata ("inversify:inject") has valid length
  public hasDependencies(func : Function) : boolean {
    return (decoratorUtils.getParanNames(func).length !== 0);
  }

  public getMetadata(target) : Array<ITarget> {
    var metadataKey = "inversify:inject";
    var metada : Array<ITarget> = Reflect.getMetadata(metadataKey, target);
    return metada;
  }

  // Examines if a constructor has any dependencies.
  // If so, it will resolve and inject them
  public injectDependencies<TImplementationType>(
    bindingDictionary : ILookup<IBinding<any>>,
    func : { new(): TImplementationType ;}) : TImplementationType {

      // var args = this._getConstructorArguments(func);

      var hasConstructorArguments = this.hasDependencies(func);
      if(hasConstructorArguments === false) {
        return new func();
      }
      else {
        var injections : Object[] = [], implementation = null;
        var metadata = this.getMetadata(func);
        for(var i = 0; i < metadata.length; i++) {
          implementation = this.get<any>(bindingDictionary, metadata[i]);
          injections.push(implementation);
        }
        return this.construct<TImplementationType>(func, injections);
      }
  }

  // Creates instances of objects
  public construct<TImplementationType>(
    constr : { new(): TImplementationType ;}, args : Object[]) : TImplementationType {

      return new (Function.prototype.bind.apply(constr, [null].concat(args)));
  }

  public get<TImplementationType>(bindingDictionary : ILookup<IBinding<any>>, target : ITarget) : TImplementationType {
    var bindings : IBinding<TImplementationType>[];

    if(bindingDictionary.hasKey(target.service.value())) {
      bindings = bindingDictionary.get(target.service.value());
    }
    else {
      // no bindings available
      return null;
    }

    if(bindings.length > 0) {
      if(target.isArray()) {

      }
      else {
        if(target.isNamed()) {

        }
        else {
          if(target.isTagged()) {

          }
          else {

          }
        }
      }
    }
    else {
      var binding = bindings[0];
    }

    // The type binding cache is used to store singleton instance
    if((binding.scope === BindingScopeEnum.Singleton) && (binding.cache !== null)) {
      return binding.cache;
    }
    else {
      var result = this.injectDependencies<TImplementationType>(bindingDictionary, binding.implementationType);
      binding.cache = result;
      return result;
    }
  }
}

export { Resolver };
