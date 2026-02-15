export type Position = {
    x: number;
    y: number;
}

export type Velocity = {
    vx: number;
    vy: number;
}

export type Render = {
    color: string;
}

export type Thing = {
    id: number,
    position?: Position;
    render?: Render;
    velocity?: Velocity;
};
