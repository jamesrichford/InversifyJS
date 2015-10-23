///<reference path="../../typings/tsd.d.ts" />

import { Kernel } from "../../source/kernel/kernel";
import { Context } from "../../source/activation/context";
import { Request } from "../../source/activation/request";
import { activationUtils } from "../../source/activation/activation_utils";
var expect = chai.expect;

describe('Request Test Suite \n', () => {

  it('It should be able to set its own properties correctly \n', () => {
    var kernel = new Kernel();
    var context =  new Context(kernel);
    var request = new Request(context);

    // TODO
    //this.guid = activationUtils.guid();
    //this.context = context;
    //this.childRequests = null;
    //this.parentRequest = parentRequest || null;
    //this.injectedInto = new QueryableString(injectedInto) || null;
    //this.target = target || null;
  });

  it('It should be able to add child requests \n', () => {
    // TODO
  });

  it('It should be able to identify if it is a leaf requests \n', () => {
    // TODO
  });

  it('It should be disposable \n', () => {
    var kernel = new Kernel();
    var context =  new Context(kernel);
    var request = new Request(context);
    context.initialize(request);
    expect(context.rootRequest).to.equals(request);
    request.dispose();
    expect(context.rootRequest.context).to.be.null;
    expect(context.rootRequest.parentRequest).to.be.null;
    expect(context.rootRequest.childRequests).to.be.null;
    expect(context.rootRequest.target).to.be.null;
    expect(request).to.be.undefined;
  });

});
