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
    func : { new(): TImplementationType ;}
  ) : TImplementationType {

      // var args = this._getConstructorArguments(func);

      var hasConstructorArguments = this.hasDependencies(func);
      if(hasConstructorArguments === false) {
        return new func();
      }
      else {
        var injections : Object[] = [];
        var metadata = this.getMetadata(func);
        //for(var i = 0; i < metadata.length; i++) {
        //  implementation = this.resolve<any>();
        //  injections.push(implementation);
        //}
        return this.construct<TImplementationType>(func, injections);
      }
  }

  // Creates instances of objects
  public construct<TImplementationType>(
    constr : { new(): TImplementationType ;}, args : Object[]
  ) : TImplementationType {

      return new (Function.prototype.bind.apply(constr, [null].concat(args)));
  }

  public resolve<TImplementationType>(request : IRequest) : TImplementationType {

    // TODO
    return null;
  }

  public resolveAsync<TImplementationType>(request : IRequest) : Q.Promise<TImplementationType> {

    return Q.Promise<TImplementationType>((resolve, reject) => {
      var bindings : IBinding<TImplementationType>[];
      var bindingDictionary = request.context.kernel.bindingDictionary;

      if(bindingDictionary.hasKey(request.target.service.value())) {
        bindings = bindingDictionary.get(request.target.service.value());
      }
      else {
        var parentKernel =request.context.kernel.parentKernel;
        if(parentKernel !== null) {

          // no bindings available but parent kernel is available
          parentKernel.resolver.resolveAsync<TImplementationType>(request)
                      .then(resolve)
                      .catch(reject);
        }
        else {

          // no bindings and no parent kernel are available
          resolve(null);
        }
      }

      if(bindings.length > 0) {
        if(request.target.isArray()) {

        }
        else {
          if(request.target.isNamed()) {

          }
          else {
            if(request.target.isTagged()) {

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
        resolve(binding.cache);
      }
      else {
        var result = this.injectDependencies<TImplementationType>(binding.implementationType);
        binding.cache = result;
        resolve(result);
      }
    });

  }

}

export { Resolver };
