/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts/" />
///<reference path="../typings/bluebird/bluebird.d.ts" />

interface IBinding<T> extends IBindingNamed<T>, IBindingWith<T>, IBindingWhen<T>, IBindingIn<T>, IBindingOn<T> {
  runtimeIdentifier : string;
  implementationType : { new(): T ;};
  cache : T;
  scope : number; // BindingScopeEnum
  resolveAs : number; // BindingResultEnum
  metadata : Array<IMetadata>;
  to(implementationType : { new(...args : any[]): T ;}) : IBinding<T>;
  toValue(value : T) : IBindingNamed<T>;
  toConstructor(implementationType : { new(...args : any[]): T ;}) : IBinding<T>;
  toProvider(implementationType : { new(...args : any[]): T ;}) : IBinding<T>;
}

interface IBindingNamed<T> {
  named(name : string) : IBinding<T>;
}

interface IBindingWith<T> {
  withMetadata(name : string, value : any) : IBinding<T>;
  withConstructorArgument(name : string, value : any) : IBinding<T>;
  withPropertyValue(name : string, value : any) : IBinding<T>;
  withParameter();
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

interface IKernel {
  bind(typeBinding : IBinding<any>) : void;
  unbind(runtimeIdentifier : string) : void;
  unbindAll() : void;
  resolve<TImplementationType>(runtimeIdentifier : string) : TImplementationType;
  resolveNamed<TImplementationType>(runtimeIdentifier : string, named : string) : TImplementationType;
  resolveWithMetadata<TImplementationType>(runtimeIdentifier : string, tagged : IMetadata) : TImplementationType;
}

interface IKeyValuePair<T> {
	key : string;
	value : Array<T>;
}

interface ILookup<T> {
  add(key : string, value : T) : void;
  get(key : string) : Array<T>;
  remove(key : string) : void;
  hasKey(key : string) : boolean;
}

interface IMetadata {
  key : string;
  value : any;
}

interface IContext {
  kernel : IKernel;
  request : IRequest;
}

interface IRequest {
  context : IContext;
  parentRequest : IRequest;
}

interface ITarget {
  type : string;
  name : string;
  metadata : Array<IMetadata>;
  isArray() : boolean;
  isNamed() : boolean;
  isTagged() : boolean;
  matchesName(name : string) : boolean;
  matchesTag(name : IMetadata) : boolean;
}

interface IBindingResolver {
  hasDependencies(func : Function) : boolean;
  getMetadata(target) : Array<ITarget>;

  injectDependencies<TImplementationType>(
    bindingDictionary : ILookup<IBinding<any>>,
    func : { new(): TImplementationType; }) : TImplementationType

  construct<TImplementationType>(constr : { new(): TImplementationType ;}, args : Object[]) : TImplementationType;

  get<TImplementationType>(bindingDictionary : ILookup<IBinding<any>>, target : ITarget) : TImplementationType;
}

interface IDecoratorUtils {
  tagParameter(target: any, targetKey : string, index : number, metadata : IMetadata);
  decorate(decorator : (ClassDecorator|ParameterDecorator), target : any, parameterIndex?: number) : any;
  getParanNames(func : Function) : string[];
}
