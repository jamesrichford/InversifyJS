/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts/" />
///<reference path="../typings/q/q.d.ts" />

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
  parentKernel : IKernel;
  resolver : IResolver;
  planner : IPlanner;
  bindingDictionary : ILookup<IBinding<any>>;
  bind(typeBinding : IBinding<any>) : void;
  unbind(runtimeIdentifier : string) : void;
  unbindAll() : void;
  get<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : TImplementationType;
  getAsync<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : Q.Promise<TImplementationType>;
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
  guid : string;
  kernel : IKernel;
  rootRequest : IRequest;
  depth : number;
  dispose() : void;
}

interface IRequest {
  guid : string;
  depth : number;
  injectedInto : IQueryableString;
  parentRequest : IRequest;
  childRequests : IRequest[];
  context : IContext;
  target : ITarget;
  addChildRequest(target : ITarget, injectedInto : string);
  isLeaf() : boolean;
  dispose() : void;
}

interface ITarget {
  service : IQueryableString;
  name : IQueryableString;
  metadata : Array<IMetadata>;
  isArray() : boolean;
  isNamed() : boolean;
  isTagged() : boolean;
  matchesName(name : string) : boolean;
  matchesTag(name : IMetadata) : boolean;
}

interface IActivationUtils {
  guid() : string;
}

interface IPlanner {
  getRequestTree(rootRequest : IRequest) : IRequest;
}

interface IResolver {
  hasDependencies(func : Function) : boolean;
  getMetadata(target) : Array<ITarget>;

  injectDependencies<TImplementationType>(
    func : { new(): TImplementationType; }
  ) : TImplementationType

  construct<TImplementationType>(
    constr : { new(): TImplementationType ;}, args : Object[]
  ) : TImplementationType;

  resolve<TImplementationType>(request : IRequest) : TImplementationType;
  resolveAsync<TImplementationType>(request : IRequest) : Q.Promise<TImplementationType>;
}

interface IDecoratorUtils {
  tagParameter(target: any, targetKey : string, index : number, metadata : IMetadata);
  decorate(decorator : (ClassDecorator|ParameterDecorator), target : any, parameterIndex?: number) : any;
  getParanNames(func : Function) : string[];
}

interface IQueryableString {
  startsWith(searchString : string, position? : number) : boolean;
  endsWith(searchString : string, position? : number) : boolean;
  contains(searchString : string) : boolean;
  equals(compareString : string) : boolean;
  value() : string;
}
