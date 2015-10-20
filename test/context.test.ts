///<reference path="../typings/tsd.d.ts" />

import { Kernel } from "../source/kernel/kernel";
import { Context } from "../source/activation/context";
import { Request } from "../source/activation/request";
var expect = chai.expect;

describe('Context Test Suite \n', () => {

  it('It should be able to set its own properties correctly \n', () => {
    var kernel = new Kernel();
    var request1 = new Request();
    var request2 = new Request();
    var context =  new Context(kernel, [request1, request2]);
    expect(context.kernel).to.equals(kernel);
    expect(context.requests).to.be.instanceof(Array);
    expect(context.requests[0].key).to.be.eql(request1);
    expect(context.requests[1].key).to.be.eql(request2);
    expect(context.requests[2]).to.be.undefined;
  });

});
