"use strict";
// import { Config } from './config';
var GameOver = /** @class */ (function () {
    function GameOver() {
    }
    return GameOver;
}());
var Welcome = /** @class */ (function () {
    function Welcome() {
    }
    return Welcome;
}());
var Running = /** @class */ (function () {
    function Running() {
    }
    return Running;
}());
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
        this.intervalId = null;
        this.state = new Welcome();
        this.ctx = this.gameCanvas.getContext("2d");
    }
    Game.prototype.start = function () {
        var _this = this;
        this.intervalId = setInterval(function () { return _this.loop(); }, 1000 / this.config.fps);
    };
    Game.prototype.loop = function () {
        //  Delta t is the time to update/draw.
        var dt = 1 / this.config.fps;
        this.update();
        this.draw();
    };
    Game.prototype.update = function () {
        switch (this.state) {
            case Welcome:
                break;
            case GameOver:
                break;
            case Running:
                break;
        }
    };
    Game.prototype.draw = function () {
        switch (this.state) {
            case Welcome:
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.ctx.font = "30px Arial";
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textBaseline = "middle";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Space Invaders", this.width / 2, this.height / 2 - 40);
                this.ctx.font = "16px Arial";
                this.ctx.fillText("Press 'Space' or touch to start.", this.width / 2, this.height / 2);
                break;
            case GameOver:
                break;
            case Running:
                break;
        }
    };
    Game.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    return Game;
}());
