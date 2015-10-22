///<reference path="../typings/tsd.d.ts" />

import { activationUtils } from "../source/activation/activation_utils";
var expect = chai.expect;

describe("ActivationUtils class \n", () => {

  it("It should be able to generate a new guid \n", () => {
    var result = activationUtils.guid();
    expect(typeof result).to.eql("string");
    expect(result.length).to.eql(36);
  });

});
