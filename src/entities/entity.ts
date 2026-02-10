import { Position } from "components/position";
import { Velocity } from "components/velocity";
import { Render } from "components/render";

export interface Entity {
    id: number;
    components: {
        position?: Position;
        velocity?: Velocity;
        render?: Render;
    };
}

export function createEntity(id: number): Entity {
    return {
        id,
        components: {}
    };
}
// Use K to represent the specific key being passed in
export function addComponent<K extends keyof Entity['components']>(
    entity: Entity,
    name: K,
    // This ensures the component matches the type defined for that key in the interface
    component: Entity['components'][K]
): void {
    entity.components[name] = component;
}

export function getComponent<K extends keyof Entity['components']>(
    entity: Entity,
    name: K
): Entity['components'][K] {
    return entity.components[name];
}