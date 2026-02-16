import type { Position, Render, Dimensions, ID as ThingID } from './types';

export const canvas = document.getElementById('game') as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

export interface Renderable {
  id: ThingID;
  position: Position;
  dimensions: Dimensions;
  render: Render;
}

const renderables: Renderable[] = [];

export function isRenderable(thing: unknown): thing is Renderable {
  if (typeof thing !== 'object' || thing === null) return false;
  return (
    'id' in thing &&
    'render' in thing &&
    'position' in thing &&
    'dimensions' in thing
  );
}

export function registerRenderable(thing: Renderable) {
  renderables.push(thing);
}

export function renderAll(
  near: { id: ThingID }[],
  collisions: { id: ThingID }[]
) {
  const nearIds = new Set(near.map(x => x.id));
  const collisionIds = new Set(collisions.map(x => x.id));

  for (const e of renderables) {
    let color = e.render.color;

    if (nearIds.has(e.id)) color = 'rgb(174, 174, 54)';
    if (collisionIds.has(e.id)) color = 'rgb(171, 36, 36)';

    context.fillStyle = color;
    context.fillRect(e.position.x, e.position.y, e.dimensions.w, e.dimensions.h);
  }
}
