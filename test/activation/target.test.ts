///<reference path="../typings/tsd.d.ts" />

import { Target } from "../source/activation/target";
import { Metadata } from "../source/activation/metadata";
var expect = chai.expect;

describe("Target class \n", () => {

  it("It should be able to create instances of untagged tagets \n", () => {
    var target = new Target("katana", "IKatana");
    expect(target.service.value()).to.be.eql("IKatana");
    expect(target.name.value()).to.be.eql("katana");
    expect(Array.isArray(target.metadata)).to.be.eql(true);
    expect(target.metadata.length).to.be.eql(0);
  });

  it("It should be able to create instances of named tagets \n", () => {
    var target = new Target("katana", "IKatana", "primary");
    expect(target.service.value()).to.be.eql("IKatana");
    expect(target.name.value()).to.be.eql("katana");
    expect(Array.isArray(target.metadata)).to.be.eql(true);
    expect(target.metadata.length).to.be.eql(1);
    expect(target.metadata[0].key).to.be.eql("named");
    expect(target.metadata[0].value).to.be.eql("primary");
  });

  it("It should be able to create instances of tagged tagets \n", () => {
    var target = new Target("katana", "IKatana", new Metadata("power", 5));
    expect(target.service.value()).to.be.eql("IKatana");
    expect(target.name.value()).to.be.eql("katana");
    expect(Array.isArray(target.metadata)).to.be.eql(true);
    expect(target.metadata.length).to.be.eql(1);
    expect(target.metadata[0].key).to.be.eql("power");
    expect(target.metadata[0].value).to.be.eql(5);
  });

  it("It should be able to identify named metadata \n", () => {
    var target1 = new Target("katana", "IKatana", "primary");
    expect(target1.isNamed()).to.be.eql(true);
    var target2 = new Target("katana", "IKatana", new Metadata("power", 5));
    expect(target2.isNamed()).to.be.eql(false);
  });

  it("It should be able to identify multi-injections \n", () => {
    var target1 = new Target("katana", "IKatana[]");
    expect(target1.isArray()).to.be.eql(true);
    var target2 = new Target("katana", "IKatana");
    expect(target2.isArray()).to.be.eql(false);
  });

  it("It should be able to match named metadata \n", () => {
    var target1 = new Target("katana", "IKatana", "primary");
    expect(target1.matchesName("primary")).to.be.eql(true);
    expect(target1.matchesName("secondary")).to.be.eql(false);
  });

  it("It should be able to identify tagged metadata \n", () => {
    var target1 = new Target("katana", "IKatana", new Metadata("power", 5));
    expect(target1.isTagged()).to.be.eql(true);
    var target2 = new Target("katana", "IKatana", "primary");
    expect(target2.isTagged()).to.be.eql(false);
  });

  it("It should be able to match tagged metadata \n", () => {
    var target1 = new Target("katana", "IKatana", new Metadata("power", 5));
    expect(target1.matchesTag(new Metadata("power", 5))).to.be.eql(true);
    expect(target1.matchesTag(new Metadata("power", 2))).to.be.eql(false);
  });

});
