export type OneOrMany<T> = T | T[];
export type Values<T> = T[keyof T];

export interface NestedArray<T> extends Array<T | NestedArray<T>> {}
export type OneOrNested<T> = T | NestedArray<T>;
// Because of the way JSX is normally written, this is not strictly enforced, but maybe one day.
export type ChildrenOf<T> = OneOrNested<React.ReactElement<T>>;
