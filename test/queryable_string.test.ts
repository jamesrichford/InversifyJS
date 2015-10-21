///<reference path="../typings/tsd.d.ts" />

import { QueryableString } from "../source/activation/queryable_string";
var expect = chai.expect;

describe("ActivationUtils class \n", () => {

  it("It should be able to set its own properties \n", () => {
    var queryableString = new QueryableString("some_text");
    expect(queryableString.value()).to.eql("some_text");
  });

});
