import { registerMovable } from './movement';
import { registerRenderable } from './render';
export type ThingId = number;

let nextThingId = 0;
export interface Thing {
    id: ThingId;
}

export function createThing<T extends object>(thing: T): T & { id: ThingId } {
    return { ...thing, id: nextThingId++ };
}

export function registerThing<T extends Thing>(thing: T): void {
    registerMovable(thing);
    registerRenderable(thing);
}