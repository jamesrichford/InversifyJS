///<reference path="../interfaces/interfaces/interfaces.d.ts" />

import { BindingScopeEnum } from "../binding/binding_scope_enum";
import { Target } from "../activation/target";

class Resolver implements IResolver {

  // get the metadata of a class
  public getMetadata(target) : Array<ITarget> {
    var metadataKey = "inversify:inject";
    var metada : Array<ITarget> = Reflect.getMetadata(metadataKey, target);
    return metada;
  }

  // Creates instances of objects
  public construct<TImplementationType>(
    constr : { new(): TImplementationType ;}, args : Object[]
  ) : TImplementationType {

      // Create instance of class (works with ES6 classes)
      return new (Function.prototype.bind.apply(constr, [null].concat(args)));
  }

  // Examines if a constructor has any dependencies.
  // If so, it will resolve and inject them
  public injectDependencies<TImplementationType>(
    func : { new(): TImplementationType ;}
  ) : TImplementationType {

      var metadata = this.getMetadata(func);
      var hasConstructorArguments = metadata.length > 0;

      if(hasConstructorArguments === false) {
        return new func();
      }
      else {
        var injections : Object[] = [];
        var metadata = this.getMetadata(func);
        for(var i = 0; i < metadata.length; i++) {
          implementation = this.resolve<any>();
          injections.push(implementation);
        }
        return this.construct<TImplementationType>(func, injections);
      }
  }



  public getBindings(kernel : IKernel, service : string) :
    IBinding<TImplementationType>[] {

      var bindings : IBinding<TImplementationType>[] = [];
      var bindingDictionary = kernel.bindingDictionary;

      // get bindings from kernel
      if(bindingDictionary.hasKey(service)) {
        bindings = bindingDictionary.get(service);
      }

      // if kernel has parent get also its bindings
      var parentKernel = kernel.parentKernel;
      if(parentKernel !== null) {
        bindings.concat(bindings, this.getBindigns(parentKernel, service));
      }

      return bindings;
  }

  public _resolve<TImplementationType>(asyn : boolean, request : IRequest) :
    (TImplementationType|Q.Promise<TImplementationType>) {

      //request.target.service.value()

      var bindings : IBinding<TImplementationType>[];
      var matchingBindings : IBinding<TImplementationType>[];

      bindings = this.getBindigns(request);

      if(bindings.length > 0) {
        if(request.target.isArray()) {
          //var bindings.map(b => { return this.injectDependencies(b.implementationType); })
        }
        else {
          if(request.target.isNamed()) {
            // try to math named binding
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
        async ? Q.when(null) : null;
      }

  }


  public filterByName(IBinding<TImplementationType>[] bindings, name : string) :
    IBinding<TImplementationType>[] {

      // TODO
  }

  public filterByTag(IBinding<TImplementationType>[] bindings, tag : IMetadata) :
    IBinding<TImplementationType>[] {

      // TODO
  }

  public filterByContext(IBinding<TImplementationType>[] bindings, request : IRequest) :
    IBinding<TImplementationType>[] {

      // TODO
  }

  public filterBindings(IBinding<TImplementationType>[] bindings, request : IRequest) :
    IBinding<TImplementationType>[] {

        if(request.target.isArray()) {
          return bindings;
        }
        else {
          if(request.target.isNamed()) {
            bindings.filter(b => {
              b.metadata.filter(m => return m.key );
            })
          }
          else {
            if(request.target.isTagged()) {

            }
            else {

            }
          }
        }
      }
      return bindings;
  }

  public x() {

    // The type binding cache is used to store singleton instance
    if((binding.scope === BindingScopeEnum.Singleton) && (binding.cache !== null)) {
      return binding.cache;
    }
    else {
      var result = this.injectDependencies<TImplementationType>(binding.implementationType);
      binding.cache = result;
      return result;
    }
  }

  public resolve<TImplementationType>(request : IRequest) : TImplementationType {
    return this._resolve(false, request);
  }

  public resolveAsync<TImplementationType>(request : IRequest) : Q.Promise<TImplementationType> {
    return this._resolve(true, request);
  }

}

export { Resolver };
