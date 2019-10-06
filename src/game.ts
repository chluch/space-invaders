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

    constructor(
        private config: Config,
        canvas: HTMLCanvasElement
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

        this.score = 0;
        this.level = 0;
        this.intervalId = null;
        this.state = { kind: 'Welcome' };
        this.ctx = this.canvas.getContext('2d')!;
        this.input = [];
        this.ship = {
            x: this.bounds.left + (this.bounds.right - this.bounds.left) / 2,
            y: this.bounds.bottom,
            width: 20,
            height: 16
        }
    }
    start() {
        this.intervalId = setInterval(() => this.loop(), 1000 / this.config.fps);
    }

    loop() {
        //  Delta t is the time to update/draw.
        const dt = 1 / this.config.fps;
        this.update();
        this.draw();
    }

    update() {
        switch (this.state.kind) {
            case 'Welcome':
                const key = this.input.pop()
                if (key === KEY_SPACE) {
                    this.state = { kind: 'Running' }
                }
                break;
            case 'GameOver':
                break;
            case 'Running':
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
                //  Draw ship.
                console.log(this.ship);
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);
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
}




