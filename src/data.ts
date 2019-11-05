export interface Ship {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Rocket {
    x: number;
    y: number;
    velocity: number
}

export interface Invader {
    x: number;
    y: number;
    rank: number;
    file: number;
    width: number;
    height: number;
}