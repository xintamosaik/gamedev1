export interface Position {
    x: number;
    y: number;
}

export function createPosition(x: number, y: number): Position {
    return { x, y };
}
