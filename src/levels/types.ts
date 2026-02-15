
export type Background =
  | { kind: 'solid'; color: string }
  | { kind: 'none' };

export type Level = {
  background: Background;
  statics: Array<object>;
};
