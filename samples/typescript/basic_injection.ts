import { Kernel, Binding, inject, named } from "../source/inversify";

// interfaces

interface IKatana {
  tryHit(distance : number) : boolean;
}

interface IShuriken {
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
  tryHit(distance : number) : boolean {
    return (distance < 3);
  }
}

class Shuriken implements IShuriken {
  tryThrow(distance : number) : boolean {
    return (distance < 10);
  }
}

@inject(IKatana, IShuriken)
class Soldier implements ISoldier {

  private primaryWeapon : IKatana;
  private secondaryWeapon: IShuriken;

  constructor(primaryWeapon: IKatana, secondaryWeapon : IShuriken) {
    this.primaryWeapon = primaryWeapon;
    this.secondaryWeapon= secondaryWeapon;
  }

}

// InversifyJS configuration

var kernel = new Kernel();
kernel.bind(new Binding<ISoldier>(IKatana).to(ISoldier));
kernel.bind(new Binding<IKatana>(IKatana).to(Katana));
kernel.bind(new Binding<IShuriken>(IShuriken).to(Shuriken));

// composition root

var soldier = Kernel.resolve<ISoldier>(ISoldier);
soldier.primaryWeapon.tryHit(5);     // false
soldier.secondaryWeapon.tryThrow(5); // true
