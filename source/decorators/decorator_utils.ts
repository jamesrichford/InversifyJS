///<reference path="../interfaces.d.ts" />

import { Target } from "../activation/target";
declare var Map;

class DecoratorUtils implements IDecoratorUtils {

  // returns the name of the arguments of a function
  // TODO update implementation if "design:paramnames" is supported
  // https://github.com/Microsoft/TypeScript/issues/4905
  getParanNames(func : Function) : string[] {

    var fnStr, argsInit, argsEnd, result, STRIP_COMMENTS, ARGUMENT_NAMES;
    STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    ARGUMENT_NAMES = /([^\s,]+)/g;

    fnStr = func.toString().replace(STRIP_COMMENTS, '');
    argsInit = fnStr.indexOf('(') + 1;
    argsEnd = fnStr.indexOf(')');

    // If using ES6 classes and there is no constructor
    // there is no need to parser constructor args
    if('function' === typeof Map &&
       fnStr.indexOf("class") !== -1 &&
       fnStr.indexOf("constructor") === -1) {

      result = null;
    }
    else {
      result = fnStr.slice(argsInit, argsEnd).match(ARGUMENT_NAMES);
    }

    if(Array.isArray(result) === false) {
      result = []
    }
    return result;
  }

  /*
  // returns the types of the arguments of a function
  getParanTypes(target : any) : string[] {
    var paramtypes = Reflect.getMetadata("design:paramtypes", target);
    return paramtypes.map(a => a.name);
  }
  */

  public tagParameter(target: any, targetKey : string, index : number, metadata : IMetadata) {
    var metadataKey = "inversify:tagged";
    var paramsMetadata : Object = null;

    // this decorator can be used in a constructor not a method
    if(targetKey !== undefined) {
      var msg = "The @tagged and @named decorator must be applied to the parameters of a constructor.";
      throw new Error(msg);
    }

    // read metadata if avalible
    if(Reflect.hasOwnMetadata(metadataKey, target) !== true) {
      paramsMetadata = {};
    }
    else {
      paramsMetadata = Reflect.getMetadata(metadataKey, target);
    }

    // get metadata for the decorated parameter by its index
    var paramMetadata : IMetadata[] = paramsMetadata[index.toString()];
    if(Array.isArray(paramMetadata) !== true) {
      paramMetadata = [];
    }
    else {
      for(var i = 0; i < paramMetadata.length; i++) {
        var m : IMetadata = paramMetadata[i];
        if(m.key === metadata.key) {
          throw new Error(`Metadadata key ${m.key} was used more than once in a parameter.`);
        }
      }
    }

    // set metadata
    paramMetadata.push(metadata);
    paramsMetadata[index.toString()] = paramMetadata;
    Reflect.defineMetadata(metadataKey, paramsMetadata, target);
    return target;
  }

  private _decorate(decorators, target) {
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target);
      switch (arguments.length) {
          case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
      }
  }

  private _param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); }
  }

  // Allows VanillaJS developers to use decorators
  // decorate(inject("IFoo", "IBar"), FooBar);
  // decorate(named("foo"), FooBar, 0);
  // decorate(tagged("bar"), FooBar, 1);
  public decorate(
    decorator : (ClassDecorator|ParameterDecorator),
    target : any,
    parameterIndex?: number) : any {

      if(typeof parameterIndex === "number") {
        return this._decorate([this._param(0, decorator)], target);
      }
      else {
        return this._decorate([decorator], target);
      }
  }
}

var decoratorUtils = new DecoratorUtils();
export { decoratorUtils };
