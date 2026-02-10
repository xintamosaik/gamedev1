export interface Velocity {
    vx: number;
    vy: number;
}

export function createVelocity(vx: number, vy: number): Velocity {
    return { vx, vy };
}
