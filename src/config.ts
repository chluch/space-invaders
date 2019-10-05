export class Config {
    constructor(
        public bombRate: number = 0.05,
        public bombMinVelocity: number = 50,
        public bombMaxVelocity: number = 50,
        public invaderInitialVelocity: number = 25,
        public invaderAcceleration: number = 0,
        public invaderDropDistance: number = 20,
        public rocketVelocity: number = 120,
        public rocketMaxFireRate: number = 2,
        public gameWidth: number = 400,
        public gameHeight: number = 300,
        public fps: number = 50,
        public debugMode: boolean = false,
        public invaderRanks: number = 5,
        public invaderFiles: number = 10,
        public shipSpeed: number = 120,
        public levelDifficultyMultiplier: number = 0.2,
        public pointsPerInvader: number = 5,
        public limitLevelIncrease: number = 25,
        public lives: number = 3
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
        this.debugMode = debugMode;
        this.invaderRanks = invaderRanks;
        this.invaderFiles = invaderFiles;
        this.shipSpeed = shipSpeed;
        this.levelDifficultyMultiplier = levelDifficultyMultiplier;
        this.pointsPerInvader = pointsPerInvader;
        this.limitLevelIncrease = limitLevelIncrease;
        this.lives = lives;
    }
}