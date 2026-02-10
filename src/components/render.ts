export interface Render {
    color: string;
}

export function createRender(color: string): Render {
    return { color };
}
