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
import { Context } from "../activation/context"
import { Request } from "../activation/request";
import { Target } from "../activation/request";
import { Metadata } from "../activation/metadata";
import { Planner } from "./planner";
import { Resolver } from "./resolver";

class Kernel implements IKernel {

  private _parentKernel : IKernel;
  private _resolver : IResolver;
  private _planner : IPlanner;

  // The objet properties are used as unique keys type
  // bindings are used as values
  private _bindingDictionary : ILookup<IBinding<any>>;

  // Initialize the binding dictionary and resolver
  constructor(parentKernel) {
    this._parentKernel = parentKernel || null;
    this._bindingDictionary = new Lookup<IBinding<any>>();
    this.planner = new Planner();
    this._resolver = new Resolver();
  }

  // Registers a type binding
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

  private _initializeContext(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) {

      // create context
      var context = new Context(this);
      var target : ITarget = null;

      // add named/tagged metadata if defined
      var tagValueIsDefined = typeof tagValue === "string";
      if(typeof nameOrTag === "string" && tagValueIsDefined) {
        target = new Target(null, new Metadata(nameOrTag, tagValue));
      }
      else {
        if(tagValueIsDefined) throw new Error("Missing tag name!");
        target = new Target(null, new Metadata("named", nameOrTag));
      }
      context.rootRequest = new Request(context, null, null, target);

      // initialize request tree
      var context = this.planner.getRequestTree(context.rootRequest);

      return context;
  }

  public get<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : TImplementationType {
      var context = _initializeContext(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string);
      return this._resolver.resolve<TImplementationType>(runtimeIdentifier, context.rootRequest);
  }

  public getAsync<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : Promise<TImplementationType> {
    return new Promise<TImplementationType>(function(resolve, reject) {

      var context = _initializeContext(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string);
      this._resolver.resolveAsync<TImplementationType>(runtimeIdentifier, context.rootRequest)
          .then(resolve)
          .catch(reject);

    });
  }

}

export { Kernel };
