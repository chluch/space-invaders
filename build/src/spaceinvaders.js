"use strict";
var Configuration = /** @class */ (function () {
    function Configuration(bombRate, bombMinVelocity, bombMaxVelocity, invaderInitialVelocity, invaderAcceleration, invaderDropDistance, rocketVelocity, rocketMaxFireRate, gameWidth, gameHeight, fps, debugMode, invaderRanks, invaderFiles, shipSpeed, levelDifficultyMultiplier, pointsPerInvader, limitLevelIncrease) {
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
        this.debugMode = false;
        this.invaderRanks = invaderRanks;
        this.invaderFiles = invaderFiles;
        this.shipSpeed = shipSpeed;
        this.levelDifficultyMultiplier = levelDifficultyMultiplier;
        this.pointsPerInvader = pointsPerInvader;
        this.limitLevelIncrease = limitLevelIncrease;
    }
    return Configuration;
}());
var Game = /** @class */ (function () {
    function Game(config, lives, width, height, gameBounds, score, level, stateStack, pressedKeys, gameCanvas, previousX) {
        this.gameBounds = gameBounds;
        this.stateStack = stateStack;
        this.pressedKeys = pressedKeys;
        this.config = config;
        this.lives = lives;
        this.width = width;
        this.height = height;
        this.gameBounds = {
            left: gameCanvas.width / 2 - this.config.gameWidth / 2,
            right: gameCanvas.width / 2 + this.config.gameWidth / 2,
            top: gameCanvas.height / 2 - this.config.gameHeight / 2,
            bottom: gameCanvas.height / 2 + this.config.gameHeight / 2
        };
        this.score = score;
        this.level = level;
        this.stateStack = [];
        this.pressedKeys = {};
        this.gameCanvas = gameCanvas;
        this.previousX = previousX;
    }
    return Game;
}());
