export type ObjToUnion<T> = {
  [P in keyof T]: P;
}[keyof T];

export type UnionToObj<K extends string, V = string> = {
  [P in keyof { K: K } as `${K}`]: V;
};

export type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};

export type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};
