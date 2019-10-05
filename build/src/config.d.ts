declare class Config {
    bombRate: number;
    bombMinVelocity: number;
    bombMaxVelocity: number;
    invaderInitialVelocity: number;
    invaderAcceleration: number;
    invaderDropDistance: number;
    rocketVelocity: number;
    rocketMaxFireRate: number;
    gameWidth: number;
    gameHeight: number;
    fps: number;
    debugMode: boolean;
    invaderRanks: number;
    invaderFiles: number;
    shipSpeed: number;
    levelDifficultyMultiplier: number;
    pointsPerInvader: number;
    limitLevelIncrease: number;
    lives: number;
    constructor(bombRate?: number, bombMinVelocity?: number, bombMaxVelocity?: number, invaderInitialVelocity?: number, invaderAcceleration?: number, invaderDropDistance?: number, rocketVelocity?: number, rocketMaxFireRate?: number, gameWidth?: number, gameHeight?: number, fps?: number, debugMode?: boolean, invaderRanks?: number, invaderFiles?: number, shipSpeed?: number, levelDifficultyMultiplier?: number, pointsPerInvader?: number, limitLevelIncrease?: number, lives?: number);
}
