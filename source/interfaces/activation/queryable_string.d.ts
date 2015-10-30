interface IQueryableString {
  startsWith(searchString : string, position? : number) : boolean;
  endsWith(searchString : string, position? : number) : boolean;
  contains(searchString : string) : boolean;
  equals(compareString : string) : boolean;
  value() : string;
}
