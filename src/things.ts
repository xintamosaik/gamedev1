import { Static, Player } from './types';
import { registerMovable } from './movement';
import { registerRenderable } from './render';
export type ThingId = number;

let nextThingId = 0;


export function createThing<T extends object>(thing: T): T & { id: ThingId } {
    return { ...thing, id: nextThingId++ };
}

export function registerThing<T extends Static | Player>(thing: T): void {
    registerMovable(thing);
    registerRenderable(thing);
}