import type { Thing } from 'types';

export type Background =
  | { kind: 'solid'; color: string }
  | { kind: 'none' };

export type Level = {
  background: Background;
  statics: Thing[];
};
