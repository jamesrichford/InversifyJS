///<reference path="../typings/tsd.d.ts" />

import { Binding } from "../source/binding/binding";
import { BindingScopeEnum } from "../source/binding/binding_scope_enum";
var expect = chai.expect;

interface FooInterface {
  name : string;
  greet() : string;
}

interface BarInterface {
  name : string;
  greet() : string;
}

interface FooBarInterface {
  foo : FooInterface;
  bar : BarInterface;
  greet() : string;
}

export class Foo implements FooInterface {
  public name : string;
  constructor() {
    this.name = "foo";
  }
  public greet() : string {
    return this.name;
  }
}

class Bar implements BarInterface {
  public name : string;
  constructor() {
    this.name = "bar";
  }
  public greet() : string {
    return this.name;
  }
}

class FooBar implements FooBarInterface {
  public foo : FooInterface;
  public bar : BarInterface;
  constructor(FooInterface : FooInterface, BarInterface : BarInterface) {
    this.foo = FooInterface;
    this.bar = BarInterface;
  }
  public greet() : string{
    return this.foo.greet() + this.bar.greet();
  }
}

describe("Binding class \n", () => {

  it('It should set its own properties correctly \n', () => {
    var runtimeIdentifier = "FooInterface";
    var binding =  new Binding<FooInterface>(runtimeIdentifier).to(Foo);
    expect(binding.runtimeIdentifier).to.equals(runtimeIdentifier);
    expect(binding.implementationType).to.not.equals(null);
    expect(binding.cache).to.equals(null);
    expect(binding.scope).to.equal(BindingScopeEnum.Transient);

    var runtimeIdentifier = "BarInterface";
    var binding =  new Binding<BarInterface>(runtimeIdentifier).to(Bar).inSingletonScope();

    expect(binding.runtimeIdentifier).to.equals(runtimeIdentifier);
    expect(binding.implementationType).to.not.equals(null);
    expect(binding.cache).to.equals(null);
    expect(binding.scope).to.equal(BindingScopeEnum.Singleton);
  });

  it("It should be able to use implementationType as a constructor \n", () => {
    var runtimeIdentifier = "FooInterface";
    var binding =  new Binding<FooInterface>(runtimeIdentifier).to(Foo);
    var instance = new binding.implementationType();
    expect(instance.greet()).to.equals("foo");
  });

});
