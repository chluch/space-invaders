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
