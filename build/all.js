"use strict";
var Config = /** @class */ (function () {
    function Config(bombRate, bombMinVelocity, bombMaxVelocity, invaderInitialVelocity, invaderAcceleration, invaderDropDistance, rocketVelocity, rocketMaxFireRate, gameWidth, gameHeight, fps, debugMode, invaderRanks, invaderFiles, shipSpeed, levelDifficultyMultiplier, pointsPerInvader, limitLevelIncrease, lives) {
        if (bombRate === void 0) { bombRate = 0.05; }
        if (bombMinVelocity === void 0) { bombMinVelocity = 50; }
        if (bombMaxVelocity === void 0) { bombMaxVelocity = 50; }
        if (invaderInitialVelocity === void 0) { invaderInitialVelocity = 25; }
        if (invaderAcceleration === void 0) { invaderAcceleration = 0; }
        if (invaderDropDistance === void 0) { invaderDropDistance = 20; }
        if (rocketVelocity === void 0) { rocketVelocity = 120; }
        if (rocketMaxFireRate === void 0) { rocketMaxFireRate = 2; }
        if (gameWidth === void 0) { gameWidth = 400; }
        if (gameHeight === void 0) { gameHeight = 300; }
        if (fps === void 0) { fps = 50; }
        if (debugMode === void 0) { debugMode = false; }
        if (invaderRanks === void 0) { invaderRanks = 5; }
        if (invaderFiles === void 0) { invaderFiles = 10; }
        if (shipSpeed === void 0) { shipSpeed = 120; }
        if (levelDifficultyMultiplier === void 0) { levelDifficultyMultiplier = 0.2; }
        if (pointsPerInvader === void 0) { pointsPerInvader = 5; }
        if (limitLevelIncrease === void 0) { limitLevelIncrease = 25; }
        if (lives === void 0) { lives = 3; }
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderAcceleration = invaderAcceleration;
        this.invaderDropDistance = invaderDropDistance;
        this.rocketVelocity = rocketVelocity;
        this.rocketMaxFireRate = rocketMaxFireRate;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.fps = fps;
        this.debugMode = debugMode;
        this.invaderRanks = invaderRanks;
        this.invaderFiles = invaderFiles;
        this.shipSpeed = shipSpeed;
        this.levelDifficultyMultiplier = levelDifficultyMultiplier;
        this.pointsPerInvader = pointsPerInvader;
        this.limitLevelIncrease = limitLevelIncrease;
        this.lives = lives;
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderAcceleration = invaderAcceleration;
        this.invaderDropDistance = invaderDropDistance;
        this.rocketVelocity = rocketVelocity;
        this.rocketMaxFireRate = rocketMaxFireRate;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.fps = fps;
        this.debugMode = debugMode;
        this.invaderRanks = invaderRanks;
        this.invaderFiles = invaderFiles;
        this.shipSpeed = shipSpeed;
        this.levelDifficultyMultiplier = levelDifficultyMultiplier;
        this.pointsPerInvader = pointsPerInvader;
        this.limitLevelIncrease = limitLevelIncrease;
        this.lives = lives;
    }
    return Config;
}());
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
var Star = /** @class */ (function () {
    function Star(x, y, size, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
    }
    return Star;
}());
//Define Starfield
var Starfield = /** @class */ (function () {
    function Starfield(div, fps, minVelocity, maxVelocity, numOfStars) {
        var _this = this;
        this.div = div;
        this.fps = fps;
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.numOfStars = numOfStars;
        this.fps = fps;
        this.canvas = document.createElement('canvas');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stars = [];
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.numOfStars = numOfStars;
        this.intervalId = null;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.div.appendChild(this.canvas);
        window.addEventListener('resize', function (event) {
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
            _this.canvas.width = _this.width;
            _this.canvas.height = _this.height;
            _this.draw();
        });
    }
    Starfield.prototype.start = function () {
        var _this = this;
        for (var i = 0; i < this.numOfStars; i++) {
            this.stars.push(new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity));
        }
        this.intervalId = setInterval(function () {
            _this.update();
            _this.draw();
        }, 1000 / this.fps);
    };
    Starfield.prototype.stop = function () {
        this.stars = [];
        clearInterval(this.intervalId);
    };
    Starfield.prototype.update = function () {
        var dt = 1 / this.fps; //second per frame
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            star.y += dt * star.velocity;
            if (star.y > this.height) {
                this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
            }
        }
    };
    Starfield.prototype.draw = function () {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = "#ffffff";
        for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
            var star = _a[_i];
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    };
    return Starfield;
}());
var container = document.getElementById('container');
var fps = 60;
var minVelocity = Math.random() * 30 + 5;
var maxVelocity = Math.random() * 50 + minVelocity;
var numOfStars = Math.random() * 200 + 50;
var starfield = new Starfield(container, fps, minVelocity, maxVelocity, numOfStars);
starfield.start();
//# sourceMappingURL=all.js.map