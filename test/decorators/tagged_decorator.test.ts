declare function __decorate(decorators, target, key?, desc?);
declare function __param(paramIndex, decorator);

///<reference path="../typings/tsd.d.ts" />

import { tagged } from "../source/decorators/tagged_decorator";
import { decoratorUtils } from "../source/decorators/decorator_utils";
var expect = chai.expect;

interface IWeapon {}
class Katana implements IWeapon {}
class Shuriken implements IWeapon {}

class UnTaggedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      primary : IWeapon,
      secondary : IWeapon) {
        // ...
    }
}

class TaggedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      @tagged("power", 1) primary : IWeapon,
      @tagged("power", 2) secondary : IWeapon) {
        // ...
    }
}

class DoubleTaggedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      @tagged("power", 1) @tagged("distance", 1) primary : IWeapon,
      @tagged("power", 2) @tagged("distance", 5) secondary : IWeapon) {
        // ...
    }
}

class InvalidDecoratorUsageWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      primary : IWeapon,
      secondary : IWeapon) {
        // ...
    }

    public test(a : string){ /*...*/ }
}

describe("@named decorator test suite \n", () => {
  it("It should be able to instanciate entities \n", () => {
    var warrior = new UnTaggedWarrior(new Katana(), new Shuriken());
    var warrior1 = new TaggedWarrior(new Katana(), new Shuriken());
    var warrior2 = new DoubleTaggedWarrior(new Katana(), new Shuriken());
    var warrior3 = new InvalidDecoratorUsageWarrior(new Katana(), new Shuriken());
    warrior3.test("test");
  });
});

describe("@tagged decorator \n", () => {

  it("It should not generate metadata for untagged parameters \n", () => {
    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, UnTaggedWarrior);
    expect(paramsMetadata).to.be.undefined;
  });

  it("It should generate metadata for tagged parameters \n", () => {
    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, TaggedWarrior);
    expect(paramsMetadata).to.be.an('object');

    // assert metadata for first argument
    expect(paramsMetadata["0"]).to.be.instanceof(Array);
    var m1 : IMetadata = paramsMetadata["0"][0];
    expect(m1.key).to.be.eql("power");
    expect(m1.value).to.be.eql(1);

    // argumnet at index 0 should only have one tag
    expect(paramsMetadata["0"][1]).to.be.undefined;

    // assert metadata for second argument
    expect(paramsMetadata["1"]).to.be.instanceof(Array);
    var m2 : IMetadata = paramsMetadata["1"][0];
    expect(m2.key).to.be.eql("power");
    expect(m2.value).to.be.eql(2);

    // argumnet at index 1 should only have one tag
    expect(paramsMetadata["1"][1]).to.be.undefined;

    // no more metadata should be available
    expect(paramsMetadata["2"]).to.be.undefined;
  });

  it("It should generate metadata for parameters tagged mutiple times \n", () => {
    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, DoubleTaggedWarrior);
    expect(paramsMetadata).to.be.an('object');

    // assert metadata for argument at index 0
    expect(paramsMetadata["0"]).to.be.instanceof(Array);

    // assert argument at index 0 first tag
    var m11 : IMetadata = paramsMetadata["0"][0];
    expect(m11.key).to.be.eql("distance");
    expect(m11.value).to.be.eql(1);

    // assert argument at index 0 second tag
    var m12 : IMetadata = paramsMetadata["0"][1];
    expect(m12.key).to.be.eql("power");
    expect(m12.value).to.be.eql(1);

    // assert metadata for argument at index 1
    expect(paramsMetadata["1"]).to.be.instanceof(Array);

    // assert argument at index 1 first tag
    var m21 : IMetadata = paramsMetadata["1"][0];
    expect(m21.key).to.be.eql("distance");
    expect(m21.value).to.be.eql(5);

    // assert argument at index 1 second tag
    var m22 : IMetadata = paramsMetadata["1"][1];
    expect(m22.key).to.be.eql("power");
    expect(m22.value).to.be.eql(2);

    // no more metadata (argument at index > 1)
    expect(paramsMetadata["2"]).to.be.undefined;
  });

  it("It should throw when applayed mutiple times \n", () => {

    var metadataKey = "a";

    var useDecoratorMoreThanOnce = function() {
      __decorate([
          __param(0, tagged(metadataKey, 1)),
          __param(0, tagged(metadataKey, 2))
      ], InvalidDecoratorUsageWarrior);
    };

    var msg = `Metadadata key ${metadataKey} was used more than once in a parameter.`;
    expect(useDecoratorMoreThanOnce).to.throw(msg);
  });

  it("It should throw when not applayed to a constructor \n", () => {

    var useDecoratorOnMethodThatIsNotAContructor = function() {
      __decorate([
          __param(0, tagged("a", 1))
      ],
      InvalidDecoratorUsageWarrior.prototype,
      "test", Object.getOwnPropertyDescriptor(InvalidDecoratorUsageWarrior.prototype, "test"));
    };

    var msg = "The @tagged and @named decorator must be applied to the parameters of a constructor.";
    expect(useDecoratorOnMethodThatIsNotAContructor).to.throw(msg);
  });

  it("It should be usable in VanillaJS applications. \n", () => {

    var TaggedVanillaJSWarrior = (function () {
        function TaggedVanillaJSWarrior(primary, secondary) {
            // ...
        }
        return TaggedVanillaJSWarrior;
    })();

    var taggedVanillaJSWarrior = new TaggedVanillaJSWarrior("primary", "secondary");
    expect(taggedVanillaJSWarrior).to.be.instanceof(TaggedVanillaJSWarrior);

    decoratorUtils.decorate(tagged("power", 1), TaggedVanillaJSWarrior, 0);
    decoratorUtils.decorate(tagged("power", 2), TaggedVanillaJSWarrior, 1);

    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, TaggedVanillaJSWarrior);
    expect(paramsMetadata).to.be.an('object');

    // assert metadata for first argument
    expect(paramsMetadata["0"]).to.be.instanceof(Array);
    var m1 : IMetadata = paramsMetadata["0"][0];
    expect(m1.key).to.be.eql("power");
    expect(m1.value).to.be.eql(1);

    // argumnet at index 0 should only have one tag
    expect(paramsMetadata["0"][1]).to.be.undefined;

    // assert metadata for second argument
    expect(paramsMetadata["1"]).to.be.instanceof(Array);
    var m2 : IMetadata = paramsMetadata["1"][0];
    expect(m2.key).to.be.eql("power");
    expect(m2.value).to.be.eql(2);

    // argumnet at index 1 should only have one tag
    expect(paramsMetadata["1"][1]).to.be.undefined;

    // no more metadata should be available
    expect(paramsMetadata["2"]).to.be.undefined;

  });

});
