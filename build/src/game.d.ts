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
