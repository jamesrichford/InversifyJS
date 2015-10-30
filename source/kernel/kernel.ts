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
import { Context } from "../activation/context"
import { Request } from "../activation/request";
import { Target } from "../activation/target";
import { Metadata } from "../activation/metadata";
import { Lookup } from "./lookup";
import { Resolver } from "./resolver";

class Kernel implements IKernel {

  public resolver : IResolver;
  public parentKernel : IKernel;
  public bindingDictionary : ILookup<IBinding<any>>;

  // Initialize the binding dictionary and resolver
  constructor(parentKernel? : IKernel) {
    this.bindingDictionary = new Lookup<IBinding<any>>();
    this.parentKernel = parentKernel || null;
    this.resolver = new Resolver();
  }

  // Registers a type binding
  public bind(typeBinding : IBinding<any>) : void {
    this.bindingDictionary.add(typeBinding.runtimeIdentifier, typeBinding);
  }

  // Removes a type binding from the registry by its key
  public unbind(runtimeIdentifier : string) : void {
    try {
      this.bindingDictionary.remove(runtimeIdentifier);
    }
    catch(e) {
      throw new Error(`Could not resolve service ${runtimeIdentifier}`);
    }
  }

  // Removes all the type bindings from the registry
  public unbindAll() : void {
    this.bindingDictionary = new Lookup<IBinding<any>>();
  }

  public get<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : TImplementationType {
    var context = this._createContext(runtimeIdentifier, nameOrTag , tagValue);
    return this.resolver.resolve<TImplementationType>(context.rootRequest);
  }

  public getAsync<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : Q.Promise<TImplementationType> {

    return Q.Promise<TImplementationType>((resolve, reject) => {
      var context = this._createContext(runtimeIdentifier, nameOrTag , tagValue);
      return this.resolver.resolveAsync<TImplementationType>(context.rootRequest);
    });
  }

  private _createContext(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) {

    // create context
    var context = new Context(this);
    var target : ITarget = null;

    // add named/tagged metadata if defined
    var tagNameIsDefined = typeof nameOrTag === "string";
    var tagValueIsDefined = typeof tagValue === "string";

    if(tagNameIsDefined && tagValueIsDefined) {

      // named
      target = new Target(null, runtimeIdentifier, new Metadata(nameOrTag, tagValue));
    }
    else if(tagNameIsDefined) {

      // tagged
      if(tagValueIsDefined) throw new Error("Missing tag value!");
      target = new Target(null, runtimeIdentifier, new Metadata("named", tagValue));
    }
    else {

      // default
      target = new Target(null, runtimeIdentifier, null);
    }
    context.rootRequest = new Request(context, null, null, target);

    return context;
  }

}

export { Kernel };
