///<reference path="../typings/q/q.d.ts" />

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
