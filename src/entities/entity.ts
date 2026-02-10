export interface Entity {
    id: number;
    components: Record<string, any>;
}

export function createEntity(id: number): Entity {
    return { id, components: {} };
}

export function addComponent<T>(
    entity: Entity,
    name: string,
    component: T
): void {
    entity.components[name] = component;
}

export function getComponent<T>(
    entity: Entity,
    name: string
): T | undefined {
    return entity.components[name] as T;
}