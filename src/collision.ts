import type { Position, Dimensions } from './types';

export interface Collidable {
  position: Position;
  dimensions: Dimensions;
  solid?: boolean;
}
export type Solid = Collidable & { solid: true };
const solids: Solid[] = [];

export function isSolid(thing: unknown): thing is Solid {
  if (typeof thing !== 'object' || thing === null) return false;
  if (!('position' in thing) || !('dimensions' in thing)) return false;
  return (thing as any).solid === true;
}

export function registerSolid(thing: Solid) {
  solids.push(thing);
}


export function getSolids(): readonly Solid[] {
  return solids;
}

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
export function checkCollisions(position: Position, dimensions: Dimensions): Solid[] {
  const collided: Solid[] = [];
  for (const solid of solids) {
    if (aabbIntersects(
      position.x, position.y, dimensions.w, dimensions.h,
      solid.position.x, solid.position.y, solid.dimensions.w, solid.dimensions.h
    )) {
      collided.push(solid);
    }
  }
  return collided;
}