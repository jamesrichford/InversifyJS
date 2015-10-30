interface IKeyValuePair<T> {
	key : string;
	value : Array<T>;
}

interface ILookup<T> {
  add(key : string, value : T) : void;
  get(key : string) : Array<T>;
  remove(key : string) : void;
  hasKey(key : string) : boolean;
}
