///<reference path="../typings/tsd.d.ts" />

import { Kernel, Binding, inject, named, tagged } from "../source/inversify";

var expect = chai.expect;

describe("Inversify root module \n", () => {

  it("It should be able to acess roor module contents \n", () => {
    expect(typeof Kernel).eql("function");
    expect(typeof Binding).eql("function");
    expect(typeof inject).eql("function");
    expect(typeof named).eql("function");
    expect(typeof tagged).eql("function");
  });

});
