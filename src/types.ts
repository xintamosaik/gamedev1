export type ID = number;

export type Thing = {
    id: ID,
};

export type Position = {
    x: number;
    y: number;
}

export type Dimensions = {
    w: number;
    h: number; 
}
export type Velocity = {
    vx: number;
    vy: number;
}

export type Solid = {
    solid: boolean;
}

export type Render = {
    color: string;
}