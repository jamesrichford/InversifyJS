///<reference path="../typings/tsd.d.ts" />

import { Kernel } from "../source/kernel/kernel";
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

describe('Kernel Test Suite \n', () => {

  it('It should be able to resolve a service without dependencies \n', () => {
    var expected = new Foo();
    var kernel = new Kernel();
    var runtimeIdentifier = "FooInterface";
    var binding =  new Binding<FooInterface>(runtimeIdentifier).to(Foo);
    kernel.bind(binding);
    var result = kernel.resolve<FooInterface>(runtimeIdentifier);
    expect(expected.name).to.equals(result.name);
    expect(expected.greet()).to.equals(result.greet());
  });

  it('It should be able to resolve a complex dependencies tree \n', () => {
    var kernel = new Kernel();
    var fooRuntimeIdentifier = "FooInterface";
    var barRuntimeIdentifier = "BarInterface";
    var fooBarRuntimeIdentifier = "FooBarInterface";

    var fooBinding =  new Binding<FooInterface>(fooRuntimeIdentifier).to(Foo);
    var barBinding =  new Binding<BarInterface>(barRuntimeIdentifier).to(Bar);
    var fooBarBinding =  new Binding<FooBarInterface>(fooBarRuntimeIdentifier).to(FooBar).inSingletonScope();

    kernel.bind(fooBinding);
    kernel.bind(barBinding);
    kernel.bind(fooBarBinding);

    var fooResult = kernel.resolve<FooInterface>(fooRuntimeIdentifier);
    var barResult = kernel.resolve<BarInterface>(barRuntimeIdentifier);
    var fooBarresult = kernel.resolve<FooBarInterface>(fooBarRuntimeIdentifier);

    expect(fooBarresult.foo).to.not.be.null;
    expect(fooBarresult.bar).to.not.be.null;
    expect(fooBarresult.greet()).to.eql("foobar");
  });

  it('It should NOT be able to resolve unbound dependencies \n', () => {
    var kernel = new Kernel();
    var fooRuntimeIdentifier = "FooInterface";
    var barRuntimeIdentifier = "BarInterface";

    var barBinding =  new Binding<BarInterface>(barRuntimeIdentifier).to(Bar);
    kernel.bind(barBinding);

    var foo = kernel.resolve(fooRuntimeIdentifier);
    var bar = kernel.resolve(barRuntimeIdentifier);
    expect(foo).to.be.null;
    expect(bar).to.not.be.null;
  });

  it('It should store singleton type bindings in cache \n', () => {
    var kernel = new Kernel();
    var runtimeIdentifier = "FooInterface";

    // Singleton binding
    var binding =  new Binding<FooInterface>(runtimeIdentifier).to(Foo).inSingletonScope();
    kernel.bind(binding);

    var expected = kernel.resolve<FooInterface>(runtimeIdentifier);
    expected.name = "new name";

    // Because is a singleton expected.name should equal result.name
    var result = kernel.resolve<FooInterface>(runtimeIdentifier);

    expect(expected.name).to.equals(result.name);
    expect(expected.greet()).to.equals(result.greet());
  });

  it('It should unbind a binding when requested \n', () => {
    var kernel = new Kernel();
    var fooRuntimeIdentifier = "FooInterface";
    var barRuntimeIdentifier = "BarInterface";

    var fooBinding =  new Binding<FooInterface>(fooRuntimeIdentifier).to(Foo);
    var barBinding =  new Binding<BarInterface>(barRuntimeIdentifier).to(Bar);
    kernel.bind(fooBinding);
    kernel.bind(barBinding);

    var foo = kernel.resolve(fooRuntimeIdentifier);
    var bar = kernel.resolve(barRuntimeIdentifier);
    expect(foo).to.not.be.null;
    expect(bar).to.not.be.null;

    kernel.unbind(fooRuntimeIdentifier);
    var foo = kernel.resolve(fooRuntimeIdentifier);
    var bar = kernel.resolve(barRuntimeIdentifier);
    expect(foo).to.be.null;
    expect(bar).to.not.be.null;
  });

  it('It should unbind all bindings when requested \n', () => {
    var kernel = new Kernel();
    var fooRuntimeIdentifier = "FooInterface";
    var barRuntimeIdentifier = "BarInterface";

    var fooBinding =  new Binding<FooInterface>(fooRuntimeIdentifier).to(Foo);
    var barBinding =  new Binding<BarInterface>(barRuntimeIdentifier).to(Bar);
    kernel.bind(fooBinding);
    kernel.bind(barBinding);

    kernel.unbindAll();

    var foo = kernel.resolve(fooRuntimeIdentifier);
    var bar = kernel.resolve(barRuntimeIdentifier);
    expect(foo).to.be.null;
    expect(bar).to.be.null;
  });

  it('Throw when cannot unbind \n', () => {
    var kernel = new Kernel();
    var fooRuntimeIdentifier = "FooInterface";

    var fn = function() {
      kernel.unbind(fooRuntimeIdentifier);
    }

    expect(fn).to.throw(`Could not resolve service ${fooRuntimeIdentifier}`);
  });

});
