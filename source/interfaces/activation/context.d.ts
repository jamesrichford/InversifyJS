interface IContext {
  guid : string;
  kernel : IKernel;
  rootRequest : IRequest;
  depth : number;
  dispose() : void;
}
