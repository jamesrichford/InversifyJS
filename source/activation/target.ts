///<reference path="../interfaces.d.ts" />

import { Metadata } from "./metadata";

class Target implements ITarget {
  public type : string;
  public name : string;
  public metadata : Array<IMetadata>;

  constructor(name: string, type : string, namedOrTagged? : (string|IMetadata)) {
    this.name = name;
    this.type = type;
    this.metadata = new Array<IMetadata>();
    var metadataItem : IMetadata = null;

    // is named target
    if(typeof namedOrTagged === "string") {
      metadataItem = new Metadata("named", namedOrTagged);
    }

    // is target with metadata
    else if(namedOrTagged instanceof Metadata) {
      metadataItem = namedOrTagged;
    }

    // target has metadata
    if (metadataItem !== null) {
      this.metadata.push(metadataItem);
    }
  }

  public isArray() : boolean {
	  return (this.type.indexOf("[]") != -1);
  }

  public isNamed() : boolean {
    for(var i = 0; i < this.metadata.length; i++) {
      var m = this.metadata[i];
      if(m.key === "named") {
        return true;
      }
    }
    return false;
  }

  public isTagged() : boolean {
    for(var i = 0; i < this.metadata.length; i++) {
      var m = this.metadata[i];
      if(m.key !== "named") {
        return true;
      }
    }
    return false;
  }

  public matchesName(name : string) : boolean{
    for(var i = 0; i < this.metadata.length; i++) {
      var m = this.metadata[i];
      if(m.key === "named" && m.value === name) {
        return true;
      }
    }
    return false;
  }

  public matchesTag(metadata : IMetadata) : boolean {
    for(var i = 0; i < this.metadata.length; i++) {
      var m = this.metadata[i];
      if(m.key === metadata.key && m.value === metadata.value) {
        return true;
      }
    }
    return false;
  }
}

export { Target };
