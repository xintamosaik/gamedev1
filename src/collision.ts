import type { Position, Dimensions, Solid } from './types';

export interface Collidable {
  position: Position;
  dimensions: Dimensions;
  solid?: Solid; 
}

const solids: Collidable[] = [];

export function isSolid(thing: unknown): thing is Collidable {
  if (typeof thing !== 'object' || thing === null) return false;
  if (!('solid' in thing) || (thing as any).solid !== true) return false;
  if (!('position' in thing) || !('dimensions' in thing)) return false;
  return true;
}

export function registerSolid(thing: Collidable) {
  solids.push(thing);
}


export function getSolids(): readonly Collidable[] {
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
export function checkCollisions(position: Position, dimensions: Dimensions) {
  const collidedSolids = [];
  const solids = getSolids();
  for (const solid of solids) {
    if (aabbIntersects(
      position.x, position.y, dimensions.w, dimensions.h,
      solid.position.x, solid.position.y, solid.dimensions.w, solid.dimensions.h
    )) {
      collidedSolids.push(solid);
    }
 
  }
  return collidedSolids;
}
