declare class Star {
    x: number;
    y: number;
    size: number;
    velocity: number;
    constructor(x: number, y: number, size: number, velocity: number);
}
declare class Starfield {
    private div;
    private fps;
    private minVelocity;
    private maxVelocity;
    private numOfStars;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    stars: Array<Star>;
    intervalId: number | null;
    constructor(div: HTMLElement, fps: number, minVelocity: number, maxVelocity: number, numOfStars: number);
    start(): void;
    stop(): void;
    update(): void;
    draw(): void;
}
declare const container: HTMLElement | null;
declare const fps = 60;
declare const minVelocity: number;
declare const maxVelocity: number;
declare const numOfStars: number;
declare const starfield: Starfield;
