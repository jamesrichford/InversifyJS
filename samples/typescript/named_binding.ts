import { Kernel, Binding, inject, named } from "../source/inversify";

// interfaces

interface IWeapon {
  power : number;
  endurance : number;
}

interface IKatana implements IWeapon {
  tryHit(distance : number) : boolean;
}

interface IShuriken implements IWeapon {
  tryThrow(distance : number) : boolean;
}

interface ISoldier {
  primaryWeapon IKatana;
  secondaryWeapon IShuriken;
}

// symbols

const IKatana = "IKatana";
const IShuriken = "IShuriken";
const ISoldier = "ISoldier";

// classes

class Katana implements IKatana {

  power : number;
  endurance : number;

  constructor() : {
    this.power = 5;
    this.endurance = 10;
  }

  tryHit(distance : number) : boolean {
    return (distance < 3);
  }
}

class Shuriken implements IShuriken {

  power : number;
  endurance : number;

  constructor() : {
    this.power = 2;
    this.endurance = 6;
  }

  tryThrow(distance : number) : boolean {
    return (distance < 10);
  }
}

@inject(IKatana, IShuriken)
class Soldier implements ISoldier {

  private primaryWeapon : IWeapon;
  private secondaryWeapon: IWeapon;

  constructor(
    @named("primary") primaryWeapon: IWeapon,
    @named("secondary") secondaryWeapon : IWeapon
  ) {

      this.primaryWeapon = primaryWeapon;
      this.secondaryWeapon= secondaryWeapon;
  }

}

// InversifyJS configuration

var kernel = new Kernel();
kernel.bind(new Binding<ISoldier>(IKatana).to(ISoldier));
kernel.bind(new Binding<IWeapon>(IWeapon).to(Katana).named("primary"));
kernel.bind(new Binding<IWeapon>(IWeapon).to(Shuriken).named("secondary"));

// composition root

var soldier = Kernel.resolve<ISoldier>(ISoldier);
soldier.primaryWeapon.tryHit(5);     // false
soldier.secondaryWeapon.tryThrow(5); // true
