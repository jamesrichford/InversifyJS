declare function __decorate(decorators, target, key?, desc?);
declare function __param(paramIndex, decorator);

///<reference path="../typings/tsd.d.ts" />

import { decoratorUtils } from "../source/decorators/decorator_utils";
import { named } from "../source/decorators/named_decorator";
var expect = chai.expect;

interface IWeapon {}
class Katana implements IWeapon {}
class Shuriken implements IWeapon {}

class UnNamedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      primary : IWeapon,
      secondary : IWeapon) {
        // ...
    }
}

class NamedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      @named("more_powerful") primary : IWeapon,
      @named("less_powerful") secondary : IWeapon) {
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
    var warrior = new UnNamedWarrior(new Katana(), new Shuriken());
    var warrior2 = new NamedWarrior(new Katana(), new Shuriken());
    var warrior3 = new InvalidDecoratorUsageWarrior(new Katana(), new Shuriken());
    warrior3.test("test");
  });
});

describe("@named decorator \n", () => {

  it("It should not generate metadata for unnamed parameters \n", () => {
    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, UnNamedWarrior);
    expect(paramsMetadata).to.be.undefined;
  });

  it("It should generate metadata for named parameters \n", () => {
    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, NamedWarrior);
    expect(paramsMetadata).to.be.an('object');

    // assert metadata for first argument
    expect(paramsMetadata["0"]).to.be.instanceof(Array);
    var m1 : IMetadata = paramsMetadata["0"][0];
    expect(m1.key).to.be.eql("named");
    expect(m1.value).to.be.eql("more_powerful");
    expect(paramsMetadata["0"][1]).to.be.undefined;

    // assert metadata for second argument
    expect(paramsMetadata["1"]).to.be.instanceof(Array);
    var m2 : IMetadata = paramsMetadata["1"][0];
    expect(m2.key).to.be.eql("named");
    expect(m2.value).to.be.eql("less_powerful");
    expect(paramsMetadata["1"][1]).to.be.undefined;

    // no more metadata should be available
    expect(paramsMetadata["2"]).to.be.undefined;
  });

  it("It should throw when applayed mutiple times \n", () => {

    var useDecoratorMoreThanOnce = function() {
      __decorate([
          __param(0, named("a")),
          __param(0, named("b"))
      ], InvalidDecoratorUsageWarrior);
    };

    var msg = "Metadadata key named was used more than once in a parameter.";
    expect(useDecoratorMoreThanOnce).to.throw(msg);
  });

  it("It should throw when not applayed to a constructor \n", () => {

    var useDecoratorOnMethodThatIsNotAContructor = function() {
      __decorate([
          __param(0, named("a"))
      ],
      InvalidDecoratorUsageWarrior.prototype,
      "test", Object.getOwnPropertyDescriptor(InvalidDecoratorUsageWarrior.prototype, "test"));
    };

    var msg = "The @tagged and @named decorator must be applied to the parameters of a constructor.";
    expect(useDecoratorOnMethodThatIsNotAContructor).to.throw(msg);
  });

  it("It should be usable in VanillaJS applications. \n", () => {

    var NamedVanillaJSWarrior = (function () {
        function NamedVanillaJSWarrior(primary, secondary) {
            // ...
        }
        return NamedVanillaJSWarrior;
    })();

    var namedVanillaJSWarrior = new NamedVanillaJSWarrior("primary", "secondary");
    expect(namedVanillaJSWarrior).to.be.instanceof(NamedVanillaJSWarrior);

    decoratorUtils.decorate(named("more_powerful"), NamedVanillaJSWarrior, 0);
    decoratorUtils.decorate(named("less_powerful"), NamedVanillaJSWarrior, 1);

    var metadataKey = "inversify:tagged";
    var paramsMetadata = Reflect.getMetadata(metadataKey, NamedVanillaJSWarrior);
    expect(paramsMetadata).to.be.an('object');

    // assert metadata for first argument
    expect(paramsMetadata["0"]).to.be.instanceof(Array);
    var m1 : IMetadata = paramsMetadata["0"][0];
    expect(m1.key).to.be.eql("named");
    expect(m1.value).to.be.eql("more_powerful");
    expect(paramsMetadata["0"][1]).to.be.undefined;

    // assert metadata for second argument
    expect(paramsMetadata["1"]).to.be.instanceof(Array);
    var m2 : IMetadata = paramsMetadata["1"][0];
    expect(m2.key).to.be.eql("named");
    expect(m2.value).to.be.eql("less_powerful");
    expect(paramsMetadata["1"][1]).to.be.undefined;

    // no more metadata should be available
    expect(paramsMetadata["2"]).to.be.undefined;

  });

});
