/// <reference path="./queriyable_string.d.ts" />
/// <reference path="./target.d.ts" />
/// <reference path="./request.d.ts" />
/// <reference path="./context.d.ts" />

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
