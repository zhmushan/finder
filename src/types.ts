type LiteralUnion<T extends U, U = string> = T | (U & object);

export type ConvertTupleToObj<
  T extends ReadonlyArray<LiteralUnion<string>> | [any],
> = {
  [P in T[number]]: P;
};

export type TupleToString<T extends readonly string[]> = T[number];
