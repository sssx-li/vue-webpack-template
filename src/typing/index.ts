export type ObjToUnion<T> = {
  [P in keyof T]: P;
}[keyof T];

export type UnionToObj<K extends string, V = string> = {
  [P in keyof { K: K } as `${K}`]: V;
};
