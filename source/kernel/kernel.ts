///<reference path="../interfaces.d.ts" />

// Kernel
// ------

// Inversify is a lightweight pico container for TypeScript
// and JavaScript apps.

// A pico container uses a class constructor to identify and
// inject its dependencies. For this to work, the class needs
// to declare a constructor that includes everything it
// needs injected.

// In order to resolve a depencency, the pico container needs
// to be told which implementation type (classes) to associate
// with each service type (interfaces).

import { BindingScopeEnum } from "../binding/binding_scope_enum";
import { Lookup } from "./lookup";
import { Target } from "../activation/target";
import { BindingResolver } from "./binding_resolver";

class Kernel implements IKernel {

  private _bindingResolver : IBindingResolver;

  // The objet properties are used as unique keys type
  // bindings are used as values
  private _bindingDictionary : ILookup<IBinding<any>>;

  // The class default constructor
  constructor() {
    this._bindingDictionary = new Lookup<IBinding<any>>();
    this._bindingResolver = new BindingResolver();
  }

  // Regiters a type binding
  public bind(typeBinding : IBinding<any>) : void {
    this._bindingDictionary.add(typeBinding.runtimeIdentifier, typeBinding);
  }

  // Removes a type binding from the registry by its key
  public unbind(runtimeIdentifier : string) : void {
    try {
      this._bindingDictionary.remove(runtimeIdentifier);
    }
    catch(e) {
      throw new Error(`Could not resolve service ${runtimeIdentifier}`);
    }
  }

  // Removes all the type bindings from the registry
  public unbindAll() : void {
    this._bindingDictionary = new Lookup<IBinding<any>>();
  }

  // Resolves a dependency by its runtime-identifier
  public resolve<TImplementationType>(runtimeIdentifier : string) : TImplementationType {
    var target : ITarget = new Target(runtimeIdentifier, null, null);
    return this._resolve<TImplementationType>(target);
  }

  // Resolves named binding
  public resolveNamed<TImplementationType>(runtimeIdentifier : string, named : string) : TImplementationType {
    var target : ITarget = new Target(runtimeIdentifier, null, named);
    return this._resolve<TImplementationType>(target);
  }

  // Resolves binding with metadata
  public resolveWithMetadata<TImplementationType>(runtimeIdentifier : string, tagged : IMetadata) : TImplementationType {
    var target : ITarget = new Target(runtimeIdentifier, null, tagged);
    return this._resolve<TImplementationType>(target);
  }

  // Resolves a dependency by target
  private _resolve<TImplementationType>(target : ITarget) : TImplementationType {
    return this._bindingResolver.get<TImplementationType>(this._bindingDictionary, target);
  }
}

export { Kernel };
