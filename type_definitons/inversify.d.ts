// Type definitions for inversify 1.0.0
// Project: https://github.com/inversify/InversifyJS
// Definitions by: inversify <https://github.com/inversify>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'inversify' {
  export module inversify {

    interface IMetadata {
      key : string;
      value : any;
    }

    interface ITypeBinding<TServiceType> {
      runtimeIdentifier : string;
      implementationType : { new(): TServiceType ;};
      cache : TServiceType;
      scope : number; // TypeBindingScopeEnum
      to(implementationType : { new(...args : any[]): TServiceType ;}) : ITypeBinding<TServiceType>;
      inTransientScope() : ITypeBinding<TServiceType>;
      inSingletonScope() : ITypeBinding<TServiceType>;
    }

    interface ILookup<T> {
      add(key : string, value : T) : void;
      get(key : string) : Array<T>;
      remove(key : string) : void;
      hasKey(key : string) : boolean;
    }

    interface IKernel {
      bind(typeBinding : ITypeBinding<any>) : void;
      unbind(runtimeIdentifier : string) : void;
      unbindAll() : void;
      resolve<TImplementationType>(runtimeIdentifier : string) : TImplementationType;
    }

    export enum TypeBindingScopeEnum {
        Transient = 0,
        Singleton = 1,
    }

    export class TypeBinding<TServiceType> implements ITypeBinding<TServiceType> {
        runtimeIdentifier: string;
        implementationType: {
            new (): TServiceType;
        };
        cache: TServiceType;
        scope: TypeBindingScopeEnum;
        constructor(runtimeIdentifier: string);
        to(implementationType : { new(...args : any[]): TServiceType ;}) : ITypeBinding<TServiceType>;
        inTransientScope() : ITypeBinding<TServiceType>;
        inSingletonScope() : ITypeBinding<TServiceType>;
    }

    export class Kernel implements IKernel {
        private _bindingDictionary : ILookup<ITypeBinding<any>>;
        bind(typeBinding: ITypeBinding<any>): void;
        unbind(runtimeIdentifier: string): void;
        unbindAll(): void;
        resolve<TImplementationType>(runtimeIdentifier: string): TImplementationType;
        private _validateBinding(typeBinding);
        private _getConstructorArguments(func);
        private _injectDependencies<TImplementationType>(func);
        private _construct<TImplementationType>(constr, args);
        constructor();
    }

    interface IDecorators {
      inject(...types : string[]) : (target: any) => any;
      named(name : string) : (target: any, targetKey : string, index : number) => any;
      tagged(metadata : IMetadata) : (target: any, targetKey : string, index : number) => any;
    }

    export var decorators : IDecorators;
  }
}
