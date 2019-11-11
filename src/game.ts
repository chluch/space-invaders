import { Config } from './config';
import { Ship, Rocket, Invader, Bomb } from './data';

const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

interface GameOver {
    kind: 'GameOver'
}

interface Welcome {
    kind: 'Welcome'
}

interface Running {
    kind: 'Running'
}

type State = GameOver | Welcome | Running;

interface Bound {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export class Game {
    lives: number;
    width: number;
    height: number;
    score: number;
    level: number;
    canvas: HTMLCanvasElement;
    bounds: Bound;
    intervalId: number | null;
    state: State;
    ctx: CanvasRenderingContext2D;
    inputs: Set<number>;
    ship: Ship;
    rockets: Array<Rocket>;
    invaders: Array<Invader>;
    dt: number;
    lastRocketTime: number | null;
    bombs: Array<Bomb>;
    frontRankInvaders: any;

    constructor(
        public config: Config,
        canvas: HTMLCanvasElement,
    ) {
        this.config = config;
        this.lives = config.lives;
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.bounds = {
            left: 0,
            right: canvas.width,
            top: 0,
            bottom: canvas.height,
        };
        this.dt = 1 / this.config.fps;
        this.score = 0;
        this.level = 0;
        this.intervalId = null;
        this.state = { kind: 'Welcome' };
        this.ctx = this.canvas.getContext('2d')!;
        this.inputs = new Set();
        this.lastRocketTime = null;
        this.ship = {
            x: this.bounds.left + (this.bounds.right - this.bounds.left) / 2,
            y: this.bounds.bottom,
            width: 20,
            height: 16
        }
        this.rockets = [];
        this.invaders = [];
        this.bombs = [];
        this.frontRankInvaders = {};
    }

    init() {
        this.intervalId = setInterval(() => this.loop(), 1000 / this.config.fps);
    }

    start() {
        //  Set the ship speed for this level, as well as invader params.
        this.config.invaderInitialVelocity = this.config.invaderInitialVelocity + 1.5 * (this.config.levelMultiplier * this.config.invaderInitialVelocity);
        this.config.bombRate = this.config.bombRate + (this.config.levelMultiplier * this.config.bombRate);
        this.config.bombMinVelocity = this.config.bombMinVelocity + (this.config.levelMultiplier * this.config.bombMinVelocity);
        this.config.bombMaxVelocity = this.config.bombMaxVelocity + (this.config.levelMultiplier * this.config.bombMaxVelocity);
        this.config.rocketMaxFireRate = this.config.rocketMaxFireRate + 0.4 * this.config.limitLevel;
        this.config.invaderCurrentVelocity = this.config.invaderInitialVelocity;
        this.config.invaderVelocity = { x: -this.config.invaderInitialVelocity, y: 0 };
        this.config.invaderNextVelocity = null;

        //  Create the invaders.
        const ranks = this.config.invaderRanks + 0.1 * this.config.limitLevel;
        const files = this.config.invaderFiles + 0.2 * this.config.limitLevel;
        this.invaders = [];
        for (let rank = 0; rank < ranks; rank++) {
            for (let file = 0; file < files; file++) {
                const invader: Invader = {
                    x: (this.width / 2) + ((files / 2 - file) * 100 / files),
                    y: (this.bounds.top + rank * 10) + 3,
                    rank: this.config.invaderRanks + 0.1 * this.config.limitLevel,
                    file: this.config.invaderFiles + 0.2 * this.config.limitLevel,
                    width: 10,
                    height: 6
                }
                this.invaders.push(invader);
            }
        }
    }


    loop() {
        //  Delta t is the time to update/draw.
        this.update();
        this.draw();
    }

    update() {
        switch (this.state.kind) {
            case 'Welcome':
                if (this.inputs.has(KEY_SPACE)) {
                    this.state = { kind: 'Running' }
                    this.start();
                }
                break;
            case 'Running':
                if (this.inputs.has(KEY_LEFT)) {
                    const move = this.config.shipSpeed * this.dt;
                    if (this.ship.x - this.ship.width / 2 - move > this.bounds.left) {
                        this.ship.x -= move;
                    }
                }
                if (this.inputs.has(KEY_RIGHT)) {
                    const move = this.config.shipSpeed * this.dt;
                    if (this.ship.x + this.ship.width / 2 + move < this.bounds.right) {
                        this.ship.x += move;
                    }
                }
                if (this.inputs.has(KEY_SPACE)) {
                    this.fireRocket();
                }
                this.moveRocket();
                this.moveInvaders();
                this.checkRICollision();
                this.checkFrontRank();
                this.dropBomb();
                break;
        }
    }


    draw() {
        switch (this.state.kind) {
            case 'Welcome': {
                this.ctx.clearRect(0, 0, this.width, this.height);
                this.ctx.font = '30px Faster One';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Space Invaders', this.width / 2, this.height / 2 - 40);
                this.ctx.font = '14px Faster One';
                this.ctx.fillText('Press "Space" to start.', this.width / 2, this.height / 2);
                break;
            }
            case 'Running': {
                this.ctx.clearRect(0, 0, this.width, this.height);

                //draw spaceship
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = '#00cccc';
                this.ctx.shadowBlur = 5;
                this.ctx.fillRect(this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);

                //draw rockets
                this.ctx.fillStyle = '#ff0000';
                this.ctx.shadowBlur = 0;
                for (let i = 0; i < this.rockets.length; i++) {
                    const rocket = this.rockets[i];
                    this.ctx.fillRect(rocket.x, rocket.y - 2, 1, 4);
                }

                //draw invaders
                this.ctx.fillStyle = '#009999';
                for (let i = 0; i < this.invaders.length; i++) {
                    const invader = this.invaders[i];
                    this.ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
                }

                //  Draw bombs.
                this.ctx.fillStyle = '#ff5555';
                for (let i = 0; i < this.bombs.length; i++) {
                    const bomb = this.bombs[i];
                    this.ctx.fillRect(bomb.x - 2, bomb.y - 2, 4, 4);
                }


                break;
            }
        }
    }

    stop() {
        clearInterval(this.intervalId!);
    }

    keyDown(event: KeyboardEvent) {
        const keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.inputs.add(event.keyCode);
        }
    }

    keyUp(event: KeyboardEvent) {
        const keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.inputs.delete(event.keyCode);
        }
    }

    fireRocket() {
        if (this.lastRocketTime === null || ((new Date()).valueOf() - this.lastRocketTime) > (1000 / this.config.rocketMaxFireRate)) {
            const rocket: Rocket = {
                x: this.ship.x,
                y: this.ship.y - this.ship.height / 2,
                velocity: this.config.rocketVelocity
            }
            //  Add a rocket.
            this.rockets.push(rocket);
            this.lastRocketTime = (new Date()).valueOf();
        }
    }

    moveRocket() {
        for (const rocket of this.rockets) {
            rocket.y -= this.dt * rocket.velocity;
        }
        if (this.rockets.length > 0 && this.rockets[0].y < 0) {
            this.rockets.shift();
        }
    }

    moveInvaders() {
        let hitLeft = false, hitRight = false, hitBottom = false;
        for (let i = 0; i < this.invaders.length; i++) {
            let invader = this.invaders[i];
            let newx = invader.x + this.config.invaderVelocity!.x * this.dt;
            let newy = invader.y + this.config.invaderVelocity!.y * this.dt;
            if (hitLeft == false && newx < (this.bounds.left + invader.width / 2)) {
                hitLeft = true;
            }
            else if (hitRight == false && newx > (this.bounds.right - invader.width / 2)) {
                hitRight = true;
            }
            else if (hitBottom == false && newy > this.bounds.bottom) {
                hitBottom = true;
            }

            if (!hitLeft && !hitRight && !hitBottom) {
                invader.x = newx;
                invader.y = newy;
            }
        }
        //  Update invader velocities.
        if (this.config.invadersAreDropping) {
            this.config.invaderCurrentDropDistance += this.config.invaderVelocity!.y * this.dt;
            if (this.config.invaderCurrentDropDistance >= this.config.invaderDropDistance) {
                this.config.invadersAreDropping = false;
                this.config.invaderVelocity = this.config.invaderNextVelocity;
                this.config.invaderCurrentDropDistance = 0;
            }
        }
        //  If we've hit the left, move down then right.
        if (hitLeft) {
            this.config.invaderCurrentVelocity += this.config.invaderAcceleration;
            this.config.invaderVelocity = { x: 0, y: this.config.invaderCurrentVelocity };
            this.config.invadersAreDropping = true;
            this.config.invaderNextVelocity = { x: this.config.invaderCurrentVelocity, y: 0 };
        }
        //  If we've hit the right, move down then left.
        if (hitRight) {
            this.config.invaderCurrentVelocity += this.config.invaderAcceleration;
            this.config.invaderVelocity = { x: 0, y: this.config.invaderCurrentVelocity };
            this.config.invadersAreDropping = true;
            this.config.invaderNextVelocity = { x: -this.config.invaderCurrentVelocity, y: 0 };
        }
        //  If we've hit the bottom, it's game over.
        if (hitBottom) {
            this.config.lives = 0;
        }
    }

    //  Check for rocket/invader collisions.
    checkRICollision() {
        for (let i = 0; i < this.invaders.length; i++) {
            const invader = this.invaders[i];
            let bang = false;

            for (let j = 0; j < this.rockets.length; j++) {
                const rocket = this.rockets[j];

                if (rocket.x >= (invader.x - invader.width / 2) && rocket.x <= (invader.x + invader.width / 2) &&
                    rocket.y >= (invader.y - invader.height / 2) && rocket.y <= (invader.y + invader.height / 2)) {

                    //  Remove the rocket, set 'bang' so we don't process
                    //  this rocket again.
                    this.rockets.splice(j--, 1);
                    bang = true;
                    this.config.score += this.config.pointsPerInvader;
                    break;
                }
            }
            if (bang) {
                this.invaders.splice(i--, 1);
            }
        }
    }

    //  Find all of the front rank invaders.
    checkFrontRank() {
        for (let i = 0; i < this.invaders.length; i++) {
            const invader = this.invaders[i];
            //  If we have no invader for game file, or the invader
            //  for game file is futher behind, set the front
            //  rank invader to game one.
            if (!this.frontRankInvaders[invader.file] || this.frontRankInvaders[invader.file].rank < invader.rank) {
                this.frontRankInvaders[invader.file] = invader;
            }
        }
    }

    dropBomb() {    
        for (let i = 0; i < this.config.invaderFiles; i++) {
            const invader = this.frontRankInvaders[i];
            if (!invader) continue;
            const chance = this.config.bombRate * this.dt;
            if (chance > Math.random()) {
                const bomb: Bomb = {
                    x: invader.x,
                    y: invader.y + invader.height / 2,
                    velocity: this.config.bombMinVelocity + Math.random() * (this.config.bombMaxVelocity - this.config.bombMinVelocity)
                };
                //  Fire!
                this.bombs.push(bomb);
                console.log(this.bombs);
                console.log("Is this the bomb");
            }
        }

    }

}
