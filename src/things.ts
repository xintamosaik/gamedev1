import { Thing } from './types';
import { registerMovable } from './movement';
import { registerRenderable } from './render';
import { registerSolid } from 'collision';

let id = 0;

export function ID() {
    return id++;
}

export function registerThing(thing: Thing): void {
    registerMovable(thing);
    registerRenderable(thing);
    registerSolid(thing)
}