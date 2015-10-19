declare function __decorate(decorators, target, key?, desc?);
declare function __param(paramIndex, decorator);

///<reference path="../typings/tsd.d.ts" />

import { inject } from "../source/decorators/inject_decorator";
import { named } from "../source/decorators/named_decorator";
import { tagged } from "../source/decorators/tagged_decorator";
import { decoratorUtils } from "../source/decorators/decorator_utils";
var expect = chai.expect;

interface IWeapon {}
interface IKatana extends IWeapon {}
interface IShuriken extends IWeapon {}

class Katana implements IKatana {}
class Shuriken implements IShuriken {}

class WarriotWithoutInjections {}

@inject()
class DecoratedWarriotWithoutInjections {}

@inject("IKatana","IShuriken")
class Warrior {
    private _primaryWeapon : IKatana;
    private _secondaryWeapon : IShuriken;

    constructor(
      primary : IKatana,
      secondary : IShuriken) {
        // ...
    }
}

@inject("IKatana","IShuriken")
class NamedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      @named("strong") primary : IWeapon,
      @named("weak") secondary : IWeapon) {
        // ...
    }
}

@inject("IKatana","IShuriken")
class TaggedWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      @tagged("power", 5) primary : IWeapon,
      @tagged("power", 1) secondary : IWeapon) {
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
}

class MissingInjectionWarrior {
    private _primaryWeapon : IWeapon;
    private _secondaryWeapon : IWeapon;

    constructor(
      primary : IWeapon,
      secondary : IWeapon) {
        // ...
    }
}

describe("@inject decorator test suite \n", () => {
  it("It should be able to instanciate entities \n", () => {
    var katana = new Katana();
    var shuriken = new Shuriken();
    var warrior = new WarriotWithoutInjections();
    var warrior1 = new Warrior(katana, shuriken);
    var warrior2 = new NamedWarrior(katana, shuriken);
    var warrior3 = new TaggedWarrior(katana, shuriken);
    var warrior4 = new InvalidDecoratorUsageWarrior(katana, shuriken);
    var warrior5 = new MissingInjectionWarrior(katana, shuriken);
  });
});

describe("@inject decorator \n", () => {

  it("It should not generate metadata if no injections \n", () => {
    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, WarriotWithoutInjections);
    expect(paramsMetadata).to.be.undefined;
  });

  it("It should not generate metadata if decorated and with no injections \n", () => {
    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, WarriotWithoutInjections);
    console.log();
    expect(paramsMetadata).to.be.undefined;
  });

  it("It should generate metadata if declared injections \n", () => {
    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, Warrior);
    expect(paramsMetadata).to.be.instanceof(Array);

    var target1 : ITarget = paramsMetadata[0];
    expect(target1.type).to.be.eql("IKatana");
    expect(target1.name).to.be.eql("primary");
    expect(target1.metadata).to.be.instanceof(Array);
    expect(target1.metadata.length).to.be.eql(0);

    var target2 : ITarget = paramsMetadata[1];
    expect(target2.type).to.be.eql("IShuriken");
    expect(target2.name).to.be.eql("secondary");
    expect(target2.metadata).to.be.instanceof(Array);
    expect(target2.metadata.length).to.be.eql(0);
  });

  it("It should generate metadata for named bindings \n", () => {
    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, NamedWarrior);
    expect(paramsMetadata).to.be.instanceof(Array);

    var target1 : ITarget = paramsMetadata[0];
    expect(target1.type).to.be.eql("IKatana");
    expect(target1.name).to.be.eql("primary");
    expect(target1.metadata).to.be.instanceof(Array);
    expect(target1.metadata.length).to.be.eql(1);
    expect(target1.metadata[0].key).to.be.eql("named");
    expect(target1.metadata[0].value).to.be.eql("strong");

    var target2 : ITarget = paramsMetadata[1];
    expect(target2.type).to.be.eql("IShuriken");
    expect(target2.name).to.be.eql("secondary");
    expect(target2.metadata).to.be.instanceof(Array);
    expect(target2.metadata.length).to.be.eql(1);
    expect(target2.metadata[0].key).to.be.eql("named");
    expect(target2.metadata[0].value).to.be.eql("weak");

    expect(paramsMetadata[2]).to.be.undefined;
    expect(target1.metadata[2]).to.be.undefined;
    expect(target2.metadata[2]).to.be.undefined;
  });

  it("It should generate metadata for tagged bindings \n", () => {
    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, TaggedWarrior);
    expect(paramsMetadata).to.be.instanceof(Array);

    var target1 : ITarget = paramsMetadata[0];
    expect(target1.type).to.be.eql("IKatana");
    expect(target1.name).to.be.eql("primary");
    expect(target1.metadata).to.be.instanceof(Array);
    expect(target1.metadata.length).to.be.eql(1);
    expect(target1.metadata[0].key).to.be.eql("power");
    expect(target1.metadata[0].value).to.be.eql(5);

    var target2 : ITarget = paramsMetadata[1];
    expect(target2.type).to.be.eql("IShuriken");
    expect(target2.name).to.be.eql("secondary");
    expect(target2.metadata).to.be.instanceof(Array);
    expect(target2.metadata.length).to.be.eql(1);
    expect(target2.metadata[0].key).to.be.eql("power");
    expect(target2.metadata[0].value).to.be.eql(1);

    expect(paramsMetadata[2]).to.be.undefined;
    expect(target1.metadata[2]).to.be.undefined;
    expect(target2.metadata[2]).to.be.undefined;
  });

  it("It should throw when applayed mutiple times \n", () => {

    var useDecoratorMoreThanOnce = function() {
      __decorate([
          inject("IKatana","IShuriken"),
          inject("IKatana","IShuriken")
      ], InvalidDecoratorUsageWarrior);
    };

    var msg = "Cannot apply @inject decorator multiple times.";
    expect(useDecoratorMoreThanOnce).to.throw(msg);
  });

  it("It should throw when the number of injections do not match the number of arguments. \n", () => {

    var forgotToDeclareInjection = function() {
      __decorate([
         inject("IKatana")
      ], MissingInjectionWarrior);
    };

    var msg = "The number of types to be injected do not match the number of constructor arguments.";
    expect(forgotToDeclareInjection).to.throw(msg);
  });

  it("It should be usable in VanillaJS applications. \n", () => {

    var VanillaJSWarriorWithInjections = (function () {
        function VanillaJSWarriorWithInjections(primary, secondary) {
            // ...
        }
        return VanillaJSWarriorWithInjections;
    })();

    var vanillaJSWarriorWithInjections = new VanillaJSWarriorWithInjections("primary", "secondary");
    expect(vanillaJSWarriorWithInjections).to.be.instanceof(VanillaJSWarriorWithInjections);

    VanillaJSWarriorWithInjections = decoratorUtils.decorate(
      inject("IKatana","IShuriken"),
      VanillaJSWarriorWithInjections
    );

    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, VanillaJSWarriorWithInjections);
    expect(paramsMetadata).to.be.instanceof(Array);

    var target1 : ITarget = paramsMetadata[0];
    expect(target1.type).to.be.eql("IKatana");
    expect(target1.name).to.be.eql("primary");
    expect(target1.metadata).to.be.instanceof(Array);
    expect(target1.metadata.length).to.be.eql(0);

    var target2 : ITarget = paramsMetadata[1];
    expect(target2.type).to.be.eql("IShuriken");
    expect(target2.name).to.be.eql("secondary");
    expect(target2.metadata).to.be.instanceof(Array);
    expect(target2.metadata.length).to.be.eql(0);
  });












  it("It should generate metadata for named bindings \n", () => {




    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, NamedWarrior);
    expect(paramsMetadata).to.be.instanceof(Array);

    var target1 : ITarget = paramsMetadata[0];
    expect(target1.type).to.be.eql("IKatana");
    expect(target1.name).to.be.eql("primary");
    expect(target1.metadata).to.be.instanceof(Array);
    expect(target1.metadata.length).to.be.eql(1);
    expect(target1.metadata[0].key).to.be.eql("named");
    expect(target1.metadata[0].value).to.be.eql("strong");

    var target2 : ITarget = paramsMetadata[1];
    expect(target2.type).to.be.eql("IShuriken");
    expect(target2.name).to.be.eql("secondary");
    expect(target2.metadata).to.be.instanceof(Array);
    expect(target2.metadata.length).to.be.eql(1);
    expect(target2.metadata[0].key).to.be.eql("named");
    expect(target2.metadata[0].value).to.be.eql("weak");

    expect(paramsMetadata[2]).to.be.undefined;
    expect(target1.metadata[2]).to.be.undefined;
    expect(target2.metadata[2]).to.be.undefined;
  });

  it("It should generate metadata for tagged bindings \n", () => {

    var VanillaJSWarrior = (function () {
        function VanillaJSWarrior(primary, secondary) {
            // ...
        }
        return VanillaJSWarrior;
    })();

    var vanillaJSWarriorWithInjections = new VanillaJSWarrior("primary", "secondary");
    expect(vanillaJSWarriorWithInjections).to.be.instanceof(VanillaJSWarrior);



    VanillaJSWarrior = decoratorUtils.decorate(
      inject("IKatana","IShuriken"),
      VanillaJSWarrior
    );

    var metadataKey = "inversify:inject";
    var paramsMetadata = Reflect.getMetadata(metadataKey, TaggedWarrior);
    expect(paramsMetadata).to.be.instanceof(Array);

    var target1 : ITarget = paramsMetadata[0];
    expect(target1.type).to.be.eql("IKatana");
    expect(target1.name).to.be.eql("primary");
    expect(target1.metadata).to.be.instanceof(Array);
    expect(target1.metadata.length).to.be.eql(1);
    expect(target1.metadata[0].key).to.be.eql("power");
    expect(target1.metadata[0].value).to.be.eql(5);

    var target2 : ITarget = paramsMetadata[1];
    expect(target2.type).to.be.eql("IShuriken");
    expect(target2.name).to.be.eql("secondary");
    expect(target2.metadata).to.be.instanceof(Array);
    expect(target2.metadata.length).to.be.eql(1);
    expect(target2.metadata[0].key).to.be.eql("power");
    expect(target2.metadata[0].value).to.be.eql(1);

    expect(paramsMetadata[2]).to.be.undefined;
    expect(target1.metadata[2]).to.be.undefined;
    expect(target2.metadata[2]).to.be.undefined;
  });

});
