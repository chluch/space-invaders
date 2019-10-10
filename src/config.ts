export class Config {
    constructor(
        public bombRate: number = 0.05,
        public bombMinVelocity: number = 50,
        public bombMaxVelocity: number = 50,
        public invaderInitialVelocity: number = 25,
        public invaderCurrentVelocity: number = 10,
        public invaderCurrentDropDistance =  0,
        public invaderAcceleration: number = 0,
        public invaderDropDistance: number = 20,
        public invadersAreDropping: boolean = false,
        public rocketVelocity: number = 120,
        public rocketMaxFireRate: number = 2,
        public lastRocketTime: number | null = null,
        public fps: number = 50,
        public debugMode: boolean = false,
        public invaderRanks: number = 5,
        public invaderFiles: number = 10,
        public shipSpeed: number = 400,
        public levelDifficultyMultiplier: number = 0.2,
        public pointsPerInvader: number = 5,
        public limitLevelIncrease: number = 25,
        public lives: number = 3,
        public score: number = 0,
        public level: number = 1
    ) {
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderCurrentVelocity = invaderCurrentVelocity;
        this.invaderCurrentDropDistance =  invaderCurrentDropDistance;
        this.invaderAcceleration = invaderAcceleration;
        this.invaderDropDistance = invaderDropDistance;
        this.invadersAreDropping = invadersAreDropping;
        this.rocketVelocity = rocketVelocity;
        this.rocketMaxFireRate = rocketMaxFireRate;
        this.lastRocketTime = lastRocketTime;
        this.fps = fps;
        this.debugMode = debugMode;
        this.invaderRanks = invaderRanks;
        this.invaderFiles = invaderFiles;
        this.shipSpeed = shipSpeed;
        this.levelDifficultyMultiplier = levelDifficultyMultiplier;
        this.pointsPerInvader = pointsPerInvader;
        this.limitLevelIncrease = limitLevelIncrease;
        this.lives = lives;
        this.score = score;
        this.level = level;
    }
}