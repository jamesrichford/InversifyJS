///<reference path="../typings/tsd.d.ts" />

import { QueryableString } from "../source/activation/queryable_string";
var expect = chai.expect;

describe("ActivationUtils class \n", () => {

  it("It should be able to set its own properties \n", () => {
    var queryableString = new QueryableString("some_text");
    expect(queryableString.value()).to.eql("some_text");
  });

  it("It should be able to return its value \n", () => {
    var queryableString = new QueryableString("some_text");
    expect(queryableString.value()).to.eql("some_text");
    expect(queryableString.value() === "some_other_text").to.eql(false);
  });

  it("It should be able to identify if it's value starts with certain text \n", () => {
    var queryableString = new QueryableString("some_text");
    expect(queryableString.startsWith("some")).to.eql(true);
    expect(queryableString.startsWith("_text"), 3).to.eql(true);
    expect(queryableString.startsWith("_text")).to.eql(false);
    expect(queryableString.startsWith("_text"), 4).to.eql(false);
  });

  it("It should be able to identify if it's value ends with certain text \n", () => {
    var queryableString = new QueryableString("some_text");
    expect(queryableString.endsWith("_text")).to.eql(true);
    expect(queryableString.endsWith("_text"), 3).to.eql(true);
    expect(queryableString.endsWith("some")).to.eql(false);
    expect(queryableString.endsWith("_text"), 4).to.eql(false);
  });

  it("It should be able to identify if it's value contains certain text \n", () => {
    var queryableString = new QueryableString("some_text");
    expect(queryableString.contains("some")).to.eql(true);
    expect(queryableString.contains("_")).to.eql(true);
    expect(queryableString.contains("text")).to.eql(true);
    expect(queryableString.contains("some_other_text")).to.eql(false);
  });

});
