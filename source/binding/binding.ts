///<reference path="../interfaces/interfaces.d.ts" />

// TypeBinding
// -----------

// A type binding (or just a binding) is a mapping between a service type
// (an interface), and an implementation type to be used to satisfy such
// a service requirement.

import { BindingScopeEnum } from "./binding_scope_enum";
import { BindingResultEnum } from "./binding_result_enum";
import { Metadata } from "../activation/metadata";

class Binding<T> implements IBinding<T> {

    // The runtime identifier used because at runtime we don't have interfaces
    public runtimeIdentifier : string;

    // The constructor of a class which must implement T
    public implementationType : { new(): T ;};

    // Cache used to allow singleton scope
    public cache : T;

    // Used for toValue
    public value : T;

    // The scope mode to be used
    public scope : BindingScopeEnum;

    // the type result to be used
    public resolveAs : BindingResultEnum;

    // the metadata to be used
    public metadata : Array<IMetadata>;

    // when cosntraint
    public whenConstraint : (request : IRequest) => boolean;

    // events to be trigger when instanciated and then disposed
    public onActivationCallback : (instance : T ) => void;
    public onDeactivationCallback : (instance : T) => void;

    constructor(runtimeIdentifier : string) {
      this.runtimeIdentifier = runtimeIdentifier;
      this.cache = null;
      // The default scope (Transient)
      this.scope = BindingScopeEnum.Transient;
      // The default as (Transient)
      this.resolveAs = BindingResultEnum.Instance;
      // By default there is no metadata
      this.metadata = new Array<IMetadata>();
    }

    // Indicates that the service should be bound to the specified implementation type.
    public to(implementationType : { new(...args : any[]): T ;}) : IBinding<T> {
      this.implementationType = implementationType;
      this.resolveAs = BindingResultEnum.Instance;
      return this;
    }

    // Indicates that the service should be bound to the specified constant value.
    public toValue(value : T) : IBinding<T> {
      this.value = value;
      this.resolveAs = BindingResultEnum.Value;
      return this;
    }

    // Indicates that the service should be bound to the specified constructor function.
    public toConstructor(implementationType : { new(...args : any[]): T ;}) : IBinding<T> {
      this.implementationType = implementationType;
      this.resolveAs = BindingResultEnum.Constructor;
      return this;
    }

    // Indicates that the service should be bound to an instance of the specified provider type.
    // The instance will be activated via the kernel when an instance of the service is activated.
    public toFactory(implementationType : { new(...args : any[]): T ;}) : IBinding<T> {
      // TODO pass context to callback ctx => ctx.kernel.get("service")
      this.implementationType = implementationType;
      this.resolveAs = BindingResultEnum.Factory;
      return this;
    }

    // Indicates that the service should be bound to an instance of the specified Promise type.
    public toPromise(implementationType : { new(...args : any[]): T ;}) : IBinding<T> {
      this.implementationType = implementationType;
      this.resolveAs = BindingResultEnum.Promise;
      return this;
    }

    // Indicates that the binding should be registered with the specified name. Names are not
    // necessarily unique; multiple bindings for a given service may be registered with the same name.
    public named(name : string) : IBinding<T> {
      var m = new Metadata("named", name);
      this.metadata.push(m);
      return this;
    }

    // Sets the value of a piece of metadata on the binding.
    public withMetadata(tag : string, value : any) : IBinding<T> {
      var m = new Metadata(tag, value);
      this.metadata.push(m);
      return this;
    }

    // Indicates that the specified constructor argument should be overridden with the specified value.
    public withConstructorArgument(name : string, value : any) : IBinding<T> {
      // todo
      return this;
    }

    // Indicates that the binding should be used only for requests that support the specified condition.
    public when(constraint : (request : IRequest) => boolean) : IBinding<T> {
      this.whenConstraint = constraint;
      return this;
    }

    // Indicates that the binding should be used only for injections on the specified type.
    // Types that derive from the specified type are considered as valid targets.
    public whenInjectedInto(target : { new(): T ;}) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the binding should be used only for injections on the specified type.
    // The type must match exactly the specified type. Types that derive from the specified type
    // will not be considered as valid target.
    public whenInjectedExactlyInto(target : { new(): T ;}) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the binding should be used only when the service is being requested
    // by a service bound with the specified name.
    public whenParentNamed(name : string) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the binding should be used only when any ancestor is bound with the specified name.
    public whenAnyAnchestorNamed(name : string) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the binding should be used only when no ancestor is bound with the specified name.
    public whenNoAnchestorNamed(name : string) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the binding should be used only when any ancestor matches the specified regular expresion.
    public whenAnyAnchestorMatches(regex: RegExp) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the binding should be used only when no ancestor matches the specified regular expresion.
    public whenNoAnchestorMatches(regex: RegExp) : IBinding<T> {
      this.whenConstraint = function(request : IRequest) {
          // todo
          return false;
      };
      return this;
    }

    // Indicates that the specified callback should be invoked when instances are activated.
    public onActivation(cb : (instance : T ) => void) : IBinding<T> {
      this.onActivationCallback = cb;
      return this;
    }

    // Indicates that the specified callback should be invoked when instances are deactivated.
    public onDeactivation(cb : (instance : T ) => void) : IBinding<T> {
      this.onDeactivationCallback = cb;
      return this;
    }

    // Indicates that instances activated via the binding should not be re-used, nor have their lifecycle managed by InversifyJS.
    public inTransientScope() : IBinding<T> {
      this.scope = BindingScopeEnum.Transient;
      return this;
    }

    // Indicates that only a single instance of the binding should be created, and then
    // should be re-used for all subsequent requests.
    public inSingletonScope() : IBinding<T> {
      this.scope = BindingScopeEnum.Singleton;
      return this;
    }
}

export { Binding };
