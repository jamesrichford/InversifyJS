/// <reference path="inversify.d.ts" />

import { inversify } from "inversify";

var inject = inversify.decorators.inject;
var named = inversify.decorators.named;
var tagged = inversify.decorators.tagged;

interface IFoo {
  name : string;
  greet() : string;
}

interface IBar {
  name : string;
  greet() : string;
}

interface IFooBar {
  foo : IFoo;
  bar : IBar;
  greet() : string;
}

class Foo implements IFoo {

  public name : string;

  constructor() {
    this.name = "foo";
  }

  public greet() : string {
    return this.name;
  }
}

class Bar implements IBar {

  public name : string;

  constructor() {
    this.name = "bar";
  }

  public greet() : string {
    return this.name;
  }
}

@inject("IFoo","IBar")
class FooBar implements IFooBar {

  public foo : IFoo;
  public bar : IBar;

  constructor(foo : IFoo, bar : IBar) {
    this.foo = foo;
    this.bar = bar;
  }

  public greet() : string{
    return this.foo.greet() + this.bar.greet();
  }
}

// Kernel
var kernel = new inversify.Kernel();

// Bindings
var fooBinding =  new inversify.TypeBinding<IFoo>("IFoo").to(Foo);
var barBinding =  new inversify.TypeBinding<IBar>("IBar").to(Bar);
var fooBarBinding =  new inversify.TypeBinding<IFooBar>("IFooBar").to(FooBar).inSingletonScope();

// multiple bindings
interface IWeapon {
  damagePoints : number,
  endurancePoints : number,
  use() : void
}

class Katana implements IWeapon {
  public damagePoints : number;
  public endurancePoints : number;
  constructor() {
    this.damagePoints = 60;
    this.endurancePoints = 100;
  }
  use() { console.log("Using Katana!"); }
}

// Note: a Bokken is a wooden sword
class Bokken implements IWeapon {
  public damagePoints : number;
  public endurancePoints : number;
  constructor() {
    this.damagePoints = 10;
    this.endurancePoints = 20;
  }
  use() { console.log("Using Bokken!"); }
}

interface IWarrior {
  fight() : void;
  train() : void;
}

@inject("IWeapon[]") // Array<IWeapon> is also valid
class Samurai implements IWarrior {

  private _katana : IWeapon;
  private _bokken : IWeapon;

  constructor(weapons : IWeapon[]) {
    // order is same as order of declared bindings
    this._katana = weapons[0];
    this._katana = weapons[1];
  }
  fight() : void {
    this._katana.use();
  }
  train() : void {
    this._bokken.use();
  }
}

// contextual binding (name-based)

// contextual binding (metadata-based)

// contextual binding (context-based)


kernel.bind(fooBinding);
kernel.bind(barBinding);
kernel.bind(fooBarBinding);

// Resolve
var foo = kernel.resolve<IFoo>("IFoo");
var bar = kernel.resolve<IBar>("IBar");
var fooBar = kernel.resolve<IFooBar>("IFooBar");

// Unbind
kernel.unbind("IFoo");
kernel.unbindAll();
