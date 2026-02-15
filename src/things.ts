import { Thing } from './types';
import { registerMovable } from './movement';
import { registerRenderable } from './render';

let iterating = 0;

export function createThing( thing: object ) {
    return { ...thing, id: iterating++ };
}

export function registerThing(thing: Thing): void {
    registerMovable(thing);
    registerRenderable(thing);
}