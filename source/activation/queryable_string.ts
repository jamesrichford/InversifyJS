///<reference path="../interfaces.d.ts" />

class QueryableString implements IQueryableString {

  private str : string;

  constructor(str : string) {
    this.str = str;
  }

  public startsWith(searchString : string, position? : number) : boolean {
    position = position || 0;
    return this.str.indexOf(searchString, position) === position;
  }

  public endsWith(searchString : string, position? : number) : boolean {
    var subjectString = this.toString();
    if (typeof position !== 'number' ||
        !isFinite(position) ||
        Math.floor(position) !== position ||
        position > subjectString.length) {

          position = subjectString.length;
    }
    position -= searchString.length;
    var lastIndex = subjectString.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }

  public contains(searchString : string) : boolean {
    return (this.str.indexOf(searchString) !== -1);
  }

  public equals(compareString : string) : boolean {
    return this.str === compareString;
  }

  public value() : string {
    return this.str;
  }

}

export { QueryableString };
