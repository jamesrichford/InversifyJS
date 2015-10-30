///<reference path="../typings/q/q.d.ts" />

interface IKernel {
  parentKernel : IKernel;
  resolver : IResolver;
  bindingDictionary : ILookup<IBinding<any>>;
  bind(typeBinding : IBinding<any>) : void;
  unbind(runtimeIdentifier : string) : void;
  unbindAll() : void;
  get<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : TImplementationType;
  getAsync<TImplementationType>(runtimeIdentifier : string, nameOrTag? : string, tagValue? : string) : Q.Promise<TImplementationType>;
}
