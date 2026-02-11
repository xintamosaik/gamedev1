import type { Static } from 'types';

export type Background =
  | { kind: 'solid'; color: string }
  | { kind: 'none' };

export type Level = {
  background: Background;
  statics: Static[];
  // later:
  // playerSpawn?: Position;
  // triggers?: Trigger[];
  // colliders?: Collider[];
};
