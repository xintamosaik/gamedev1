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

export type Static = {
    position: Position;
    render: Render;
};

export type Player = {
    position: Position;
    render: Render;
    velocity: Velocity;
};
