import { Config } from './config';

const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

interface GameOver {
    kind: "GameOver"
}

interface Welcome {
    kind: "Welcome"
}

interface Running {
    kind: "Running"
}

type State = GameOver | Welcome | Running;

interface GameBound {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export class Game {
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

    constructor(
        private config: Config,
        gameCanvas: HTMLCanvasElement
    ) {
        this.config = config;
        this.lives = config.lives;
        this.gameCanvas = gameCanvas;
        this.width = gameCanvas.width;
        this.height = gameCanvas.height;
        this.gameBounds = {
            left: gameCanvas.width / 2 - this.config.gameWidth / 2,
            right: gameCanvas.width / 2 + this.config.gameWidth / 2,
            top: gameCanvas.height / 2 - this.config.gameHeight / 2,
            bottom: gameCanvas.height / 2 + this.config.gameHeight / 2
        };

        this.score = 0;
        this.level = 0;
        this.intervalId = null;
        this.state = { kind: "Welcome" };
        this.ctx = this.gameCanvas.getContext("2d")!;
        this.input = [];
    }
    start() {
        this.intervalId = setInterval(() => this.loop(), 1000 / this.config.fps);
    }

    loop() {
        //  Delta t is the time to update/draw.
        const dt = 1 / this.config.fps;
        this.update();
        this.draw();
    }

    update() {
        switch (this.state.kind) {
            case "Welcome":
                const key = this.input.pop()
                if (key === KEY_SPACE) {
                    this.state = {kind: "Running"}
                }
                break;
            case "GameOver":
                break;
            case "Running":
                break;
        }
    }

    draw() {
        console.log("draw");
        switch (this.state.kind) {
            case "Welcome": {
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.ctx.font = "30px Faster One";
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textBaseline = "middle";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Space Invaders", this.width / 2, this.height / 2 - 40);
                this.ctx.font = "14px Faster One";
                this.ctx.fillText("Press 'Space' or touch to start.", this.width / 2, this.height / 2);
                break;
            }
            case "Running": {
                this.ctx.clearRect(0, 0, this.width, this.height);
                console.log(this.ctx);
                break;
            }
        }
    }

    stop() {
        clearInterval(this.intervalId!);
    }

    keyDown(event: KeyboardEvent) {
        const keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            console.log(this);
            console.log(this.input);
            this.input.push(event.keyCode);
        }
    }
}



