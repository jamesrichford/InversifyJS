/// <reference path="../activation/metadata.d.ts" />

interface IBinding<T> extends IBindingNamed<T>, IBindingWith<T>, IBindingWhen<T>, IBindingIn<T>, IBindingOn<T> {
  runtimeIdentifier : string;
  implementationType : { new(): T ;};
  cache : T;
  value : T;
  scope : number; // BindingScopeEnum
  resolveAs : number; // BindingResultEnum
  metadata : Array<IMetadata>;
  to(implementationType : { new(...args : any[]): T ;}) : IBinding<T>;
  toValue(value : T) : IBinding<T>;
  toConstructor(implementationType : { new(...args : any[]): T ;}) : IBinding<T>;
  toFactory(implementationType : { new(...args : any[]): T ;}) : IBinding<T>;  // Callback
  toPromise(implementationType : { new(...args : any[]): T ;}) : IBinding<T>; // Promise
}

interface IBindingNamed<T> {
  named(name : string) : IBinding<T>;
}

interface IBindingWith<T> {
  withMetadata(name : string, value : any) : IBinding<T>;
  withConstructorArgument(name : string, value : any) : IBinding<T>;
}

interface IBindingWhen<T> {
  when(constraint : (request : IRequest) => {}) : IBinding<T>;
  whenInjectedInto(target : { new(): T ;}) : IBinding<T>;
  whenInjectedExactlyInto(target : { new(): T ;}) : IBinding<T>;
  whenParentNamed(name : string) : IBinding<T>;
  whenAnyAnchestorNamed(name : string) : IBinding<T>;
  whenNoAnchestorNamed(name : string) : IBinding<T>;
  whenAnyAnchestorMatches(regex: RegExp) : IBinding<T>;
  whenNoAnchestorMatches(regex: RegExp) : IBinding<T>;
}

interface IBindingIn<T> {
  inTransientScope() : IBinding<T>;
  inSingletonScope() : IBinding<T>;
}

interface IBindingOn<T> {
  onActivation(cb : (instance : T ) => void) : IBinding<T>;
  onDeactivation(cb : (instance : T ) => void) : IBinding<T>;
}
