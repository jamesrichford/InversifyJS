///<reference path="../interfaces/interfaces.d.ts" />

import { Metadata } from "./metadata";
import { QueryableString } from "./queryable_string";

class Target implements ITarget {

  public service : QueryableString;
  public name : QueryableString;
  public metadata : Array<IMetadata>;

  constructor(name: string, service : string, namedOrTagged? : (string|IMetadata)) {

    this.name = new QueryableString(name);
    this.service = new QueryableString(service);
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
	  return (this.service.value().indexOf("[]") != -1);
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
