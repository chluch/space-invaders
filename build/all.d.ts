declare class Config {
    bombRate: number;
    bombMinVelocity: number;
    bombMaxVelocity: number;
    invaderInitialVelocity: number;
    invaderAcceleration: number;
    invaderDropDistance: number;
    rocketVelocity: number;
    rocketMaxFireRate: number;
    gameWidth: number;
    gameHeight: number;
    fps: number;
    debugMode: boolean;
    invaderRanks: number;
    invaderFiles: number;
    shipSpeed: number;
    levelDifficultyMultiplier: number;
    pointsPerInvader: number;
    limitLevelIncrease: number;
    lives: number;
    constructor(bombRate?: number, bombMinVelocity?: number, bombMaxVelocity?: number, invaderInitialVelocity?: number, invaderAcceleration?: number, invaderDropDistance?: number, rocketVelocity?: number, rocketMaxFireRate?: number, gameWidth?: number, gameHeight?: number, fps?: number, debugMode?: boolean, invaderRanks?: number, invaderFiles?: number, shipSpeed?: number, levelDifficultyMultiplier?: number, pointsPerInvader?: number, limitLevelIncrease?: number, lives?: number);
}
declare const KEY_SPACE = 32;
declare const KEY_LEFT = 37;
declare const KEY_RIGHT = 39;
interface GameOver {
    kind: "GameOver";
}
interface Welcome {
    kind: "Welcome";
}
interface Running {
    kind: "Running";
}
declare type State = GameOver | Welcome | Running;
interface GameBound {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
declare class Game {
    private config;
    lives: number;
    width: number;
    height: number;
    score: number;
    level: number;
    gameCanvas: HTMLCanvasElement;
    gameBounds: GameBound;
    intervalId: number | null;
    state: State;
    ctx: CanvasRenderingContext2D;
    input: Array<number>;
    constructor(config: Config, gameCanvas: HTMLCanvasElement);
    start(): void;
    loop(): void;
    update(): void;
    draw(): void;
    stop(): void;
    keyDown(event: KeyboardEvent): void;
}
declare const space: HTMLElement;
declare const canvas: HTMLCanvasElement;
declare let game: Game;
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
