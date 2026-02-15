import type { Position, Dimensions } from './types';

export interface Collidable {
  position: Position;
  dimensions: Dimensions;
  solid?: boolean;
  interactable?: boolean;
}

export type Solid = Collidable & { solid: true };
export type Interactable = Collidable & { interactable: true };

const solids: Solid[] = [];
const interactables: Interactable[] = [];

export function isSolid(thing: unknown): thing is Solid {
  if (typeof thing !== 'object' || thing === null) return false;
  if (!('position' in thing) || !('dimensions' in thing)) return false;
  return (thing as any).solid === true;
}

export function isInteractable(thing: unknown): thing is Interactable {
  if (typeof thing !== 'object' || thing === null) return false;
  if (!('position' in thing) || !('dimensions' in thing)) return false;
  return (thing as any).interactable === true;
}

export function registerSolid(thing: Solid) {
  solids.push(thing);
}

export function registerInteractable(thing: Interactable) {
  interactables.push(thing);
}

export function getSolids(): readonly Solid[] {
  return solids;
}

export function getInteractables(): readonly Interactable[] {
  return interactables;
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

// Proximity = collision against an expanded player box.
export function checkProximity(
  position: Position,
  dimensions: Dimensions,
  aura: number
): Interactable[] {
  const ax = position.x - aura;
  const ay = position.y - aura;
  const aw = dimensions.w + aura * 2;
  const ah = dimensions.h + aura * 2;

  const near: Interactable[] = [];
  for (const obj of interactables) {
    if (aabbIntersects(
      ax, ay, aw, ah,
      obj.position.x, obj.position.y, obj.dimensions.w, obj.dimensions.h
    )) {
      near.push(obj);
    }
  }
  return near;
}
