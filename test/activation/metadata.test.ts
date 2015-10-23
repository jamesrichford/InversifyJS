///<reference path="../../typings/tsd.d.ts" />

import { Metadata } from "../../source/activation/metadata";
var expect = chai.expect;

describe("Metadta class \n", () => {

  it('It should set its own properties correctly \n', () => {
    var m =  new Metadata("power", 5);
    expect(m.key).to.equals("power");
    expect(m.value).to.equals(5);
  });

});
