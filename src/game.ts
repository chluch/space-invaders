import { Config } from './config';
import { Ship, Rocket, Invader } from './data';

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
    // invader: Invader;
    rockets: Array<Rocket>;
    invaders: Array<Invader>;
    dt: number;
    lastRocketTime: number | null;

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
        // this.invader = {
        //     x: 0,
        //     y: 0,
        //     rank: this.config.invaderRanks + 0.1 * this.config.limitLevel,
        //     width: 18,
        //     height: 14
        // }
        this.rockets = [];
        this.invaders = [];
    }

    init() {
        this.intervalId = setInterval(() => this.loop(), 1000 / this.config.fps);
    }

    start() {
        //  Setup initial state.
        this.config.invaderCurrentVelocity = 10;
        this.config.invaderCurrentDropDistance = 0;
        this.config.invadersAreDropping = false;

        //  Set the ship speed for this level, as well as invader params.
        this.config.invaderInitialVelocity = this.config.invaderInitialVelocity + 1.5 * (this.config.levelMultiplier * this.config.invaderInitialVelocity);
        this.config.bombRate = this.config.bombRate + (this.config.levelMultiplier * this.config.bombRate);
        this.config.bombMinVelocity = this.config.bombMinVelocity + (this.config.levelMultiplier * this.config.bombMinVelocity);
        this.config.bombMaxVelocity = this.config.bombMaxVelocity + (this.config.levelMultiplier * this.config.bombMaxVelocity);
        this.config.rocketMaxFireRate = this.config.rocketMaxFireRate + 0.4 * this.config.limitLevel;

        //  Create the invaders.

        const ranks = this.config.invaderRanks + 0.1 * this.config.limitLevel;
        const files = this.config.invaderFiles + 0.2 * this.config.limitLevel;
        this.invaders = [];
        for (let rank = 0; rank < ranks; rank++) {
            for (let file = 0; file < files; file++) {
                const invader: Invader = {
                    x: (this.width / 2) + ((files / 2 - file) * 150 / files),
                    y: (this.bounds.top + rank * 10),
                    rank: this.config.invaderRanks + 0.1 * this.config.limitLevel,
                    file: this.config.invaderFiles + 0.2 * this.config.limitLevel,
                    width: 10,
                    height: 6
                }
                this.invaders.push(invader);
            }
        }
    }
    //         this.config.invaderCurrentVelocity = this.config.invaderInitialVelocity;
    //         this.config.invaderVelocity = { x: -this.config.invaderInitialVelocity, y: 0 };
    //         this.config.invaderNextVelocity = null;
    //     };


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
                this.ctx.fillRect(this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);

                //draw rockets
                this.ctx.fillStyle = '#ff0000';
                for (let i = 0; i < this.rockets.length; i++) {
                    const rocket = this.rockets[i];
                    this.ctx.fillRect(rocket.x, rocket.y - 2, 1, 4);
                }

                //draw invaders
                this.ctx.fillStyle = '#006600';
                for (let i = 0; i < this.invaders.length; i++) {
                    const invader = this.invaders[i];
                    console.log('invaderrrr');
                    console.log(invader);
                    this.ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
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

}




