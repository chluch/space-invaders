import { Config } from './config';

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

interface Ship {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Rocket {
    x: number;
    y: number;
    velocity: number
}

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
    input: Array<number>;
    ship: Ship;
    rockets: Array<Rocket>;
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
        this.input = [];
        this.lastRocketTime = null;
        this.ship = {
            x: this.bounds.left + (this.bounds.right - this.bounds.left) / 2,
            y: this.bounds.bottom,
            width: 20,
            height: 16
        }
        this.rockets = [];
    }
    start() {
        this.intervalId = setInterval(() => this.loop(), 1000 / this.config.fps);
    }

    loop() {
        //  Delta t is the time to update/draw.
        this.update();
        this.draw();
    }

    update() {
        const key = this.input.shift();
        switch (this.state.kind) {
            case 'Welcome':
                if (key === KEY_SPACE) {
                    this.state = { kind: 'Running' }
                }
                break;
            case 'Running':
                if (key === KEY_LEFT) {
                    const move = this.config.shipSpeed * this.dt;
                    if (this.ship.x - this.ship.width/2 - move > this.bounds.left) {
                        this.ship.x -= move;
                    }
                }
                if (key === KEY_RIGHT) {
                    const move = this.config.shipSpeed * this.dt;
                    if (this.ship.x + this.ship.width/2 + move < this.bounds.right) {
                        this.ship.x += move;
                    }
                }
                if (key === KEY_SPACE) {
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
                console.log(`bounds: ${this.bounds}`);
                console.log('width: ' + this.width);
                console.log('height: ' + this.height);
                this.ctx.font = '30px Faster One';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Space Invaders', this.width / 2, this.height / 2 - 40);
                this.ctx.font = '14px Faster One';
                this.ctx.fillText('Press "Space" or touch to start.', this.width / 2, this.height / 2);
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
            console.log(this);
            console.log(this.input);
            this.input.push(event.keyCode);
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




