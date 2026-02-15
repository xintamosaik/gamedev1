// src/collision.ts
import type { Position, Dimensions } from './types';

export interface Solid {
  position: Position;
  dimensions: Dimensions;
  solid?: boolean; // allow implicit / future defaults
}

const solids: Solid[] = [];

function isSolid(thing: unknown): thing is Solid {
  return (
    typeof thing === 'object' &&
    thing !== null &&
    'position' in thing &&
    'dimensions' in thing &&
    // "solid" is optional, but if it exists it must be truthy to register
    (!('solid' in thing) || Boolean((thing as any).solid))
  );
}

export function registerSolid(thing: unknown) {
  if (isSolid(thing)) {
    // only register if solid is true or missing (you can tighten this later)
    if (!('solid' in thing) || (thing as any).solid === true) {
      solids.push(thing);
    }
  }
}

export function getSolids(): readonly Solid[] {
  return solids;
}

// AABB helper (inclusive/exclusive boundaries are fine either way; be consistent)
export function aabbIntersects(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number,
): boolean {
  return (
    ax < bx + bw &&
    ax + aw > bx &&
    ay < by + bh &&
    ay + ah > by
  );
}
