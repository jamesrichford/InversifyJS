///<reference path="../typings/tsd.d.ts" />

import { Binding } from "../source/binding/binding";
import { BindingScopeEnum } from "../source/binding/binding_scope_enum";
import { BindingResultEnum } from "../source/binding/binding_result_enum";
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
    expect(binding.resolveAs).to.equals(BindingResultEnum.Instance);
  });

  it("It should be able to bind to a value \n", () => {
    var runtimeIdentifier = "FooInterface";
    // using any to be able to test
    var val = new Foo();
    var binding : any =  new Binding<FooInterface>(runtimeIdentifier).toValue(val);
    expect(binding.implementationType).to.be.undefined;
    expect(binding.value).to.eql(val);
    expect(binding.resolveAs).to.equals(BindingResultEnum.Value);
  });

  it("It should be able to bind to a constructor \n", () => {
    // TODO Binding.prototype.toConstructor
  });

  it("It should be able to bind to a factory \n", () => {
    // TODO Binding.prototype.toFactory
  });

  it("It should be able to bind to a promise \n", () => {
    // TODO Binding.prototype.toPromise
  });

  it("It should be able to be named \n", () => {
    // TODO Binding.prototype.named
  });

  it("It should be able to have metadata \n", () => {
    // TODO Binding.prototype.withMetadata
  });

  it("It should be able to have a constructor arguments constraint \n", () => {
    // TODO Binding.prototype.withConstructorArgument
  });

  it("It should be able to have a property value constraint \n", () => {
    // TODO Binding.prototype.withPropertyValue
  });

  it("It should be able to have a parameter constraint \n", () => {
    // TODO Binding.prototype.withParameter
  });

  it("It should be able to have custom constraint \n", () => {
    // TODO Binding.prototype.when
  });

  it("It should be able to have injection constraint \n", () => {
    // TODO Binding.prototype.whenInjectedInto
  });

  it("It should be able to have precise injection constraint \n", () => {
    // TODO Binding.prototype.whenInjectedExactlyInto
  });

  // Binding.prototype.whenParentNamed
  // Binding.prototype.whenAnyAnchestorNamed
  // Binding.prototype.whenNoAnchestorNamed
  // Binding.prototype.whenAnyAnchestorMatches
  // Binding.prototype.whenNoAnchestorMatches
  // Binding.prototype.onActivation
  // Binding.prototype.onDeactivation

  it("It should be able to use transient scope \n", () => {
    // TODO Binding.prototype.inTransientScope
  });

  it("It should be able to use singleton scope \n", () => {
    // TODO Binding.prototype.inSingletonScope
  });

});
