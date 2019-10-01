class Configuration {
    constructor(
        private bombRate: number,
        private bombMinVelocity: number,
        private bombMaxVelocity: number,
        private invaderInitialVelocity: number,
        private invaderAcceleration: number,
        private invaderDropDistance: number,
        private rocketVelocity: number,
        private rocketMaxFireRate: number,
        public gameWidth: number,
        public gameHeight: number,
        private fps: number,
        private debugMode: boolean,
        private invaderRanks: number,
        private invaderFiles: number,
        private shipSpeed: number,
        private levelDifficultyMultiplier: number,
        private pointsPerInvader: number,
        private limitLevelIncrease: number
    ) {
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
}

class Game {
    config: Configuration;
    lives: number;
    width: number;
    height: number;
    score: number;
    level: number;
    gameCanvas: HTMLElement;
    previousX: number;

    constructor(
        config: Configuration,
        lives: number,
        width: number,
        height: number,
        private gameBounds: any,
        score: number,
        level: number,
        private stateStack: Array<any>,
        private pressedKeys: any,
        gameCanvas: HTMLElement,
        previousX: number,
    ) {
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
}