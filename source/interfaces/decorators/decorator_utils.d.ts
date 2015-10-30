/// <reference path="../activation/metadata.d.ts" />

interface IDecoratorUtils {
  tagParameter(target: any, targetKey : string, index : number, metadata : IMetadata);
  decorate(decorator : (ClassDecorator|ParameterDecorator), target : any, parameterIndex?: number) : any;
  getParanNames(func : Function) : string[];
}
