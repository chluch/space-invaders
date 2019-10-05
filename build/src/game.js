"use strict";
// import { Config } from './config';
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
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
        this.state = { kind: "Welcome" };
        this.ctx = this.gameCanvas.getContext("2d");
        this.input = [];
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
        switch (this.state.kind) {
            case "Welcome":
                var key = this.input.pop();
                if (key === KEY_SPACE) {
                    this.state = { kind: "Running" };
                }
                break;
            case "GameOver":
                break;
            case "Running":
                break;
        }
    };
    Game.prototype.draw = function () {
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
    };
    Game.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    Game.prototype.keyDown = function (event) {
        var keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            console.log(this);
            console.log(this.input);
            this.input.push(event.keyCode);
        }
    };
    return Game;
}());
var space = document.getElementById('gamecontainer');
var canvas = document.createElement('canvas');
space.appendChild(canvas);
var game = new Game(new Config(), canvas);
game.start();
//  Listen for keyboard events.
window.addEventListener("keydown", function (e) { return game.keyDown(e); });
//# sourceMappingURL=game.js.map