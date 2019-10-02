"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(config, gameCanvas) {
        this.config = config;
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
    return Game;
}());
