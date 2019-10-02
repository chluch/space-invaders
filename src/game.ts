import { Config } from './config';

interface GameOver {
}

interface Welcome {
}

interface Running {
}

type GameState = GameOver | Welcome | Running;

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

    }
}

