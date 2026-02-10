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

// Constrain `T` to be one of the component types
export function addComponent<T extends Position | Velocity | Render>(
    entity: Entity,
    name: keyof Entity['components'],
    component: T
): void {
    entity.components[name] = component;
}

// `T` must extend one of the component types
export function getComponent<T extends Position | Velocity | Render>(
    entity: Entity,
    name: keyof Entity['components']
): T | undefined {
    return entity.components[name] as T;
}
