// import { Config } from './config';

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

class Game {
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
        this.state = {kind: "Welcome"}
        this.ctx = this.gameCanvas.getContext("2d")!;
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
                // console.log("Welcome");
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
                console.log(this.ctx);
                this.ctx.font = "30px Mansalva";
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textBaseline = "middle";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Space Invaders", this.width / 2, this.height / 2 - 40);
                this.ctx.font = "16px Mansalva";
                this.ctx.fillText("Press 'Space' or touch to start.", this.width / 2, this.height / 2);
                break;
            }
            // case GameOver:
            //     break;
            // case Running:
            //     break;
        }
    }

    stop() {
        clearInterval(this.intervalId!);
    }
}
