import { Starfield } from './starfield';
import { Config } from './config';
import { Game } from './game';

const container = document.getElementById('container');
const fps = 60;
const minVelocity = Math.random() * 30 + 5;
const maxVelocity = Math.random() * 50 + minVelocity;
const numOfStars = Math.random() * 200 + 50;
const starfield = new Starfield(
    container!,
    fps,
    minVelocity,
    maxVelocity,
    numOfStars
);
starfield.start();

const space = document.getElementById('gamecontainer')!;
const canvas = document.createElement('canvas')!;
canvas.style.height = '100%';
canvas.style.width = '100%';
space.appendChild(canvas);
let game = new Game(new Config(), canvas);
game.init();

//  Listen for keyboard events.
window.addEventListener('keydown', (e) => game.keyDown(e));
window.addEventListener('keyup', (e) => game.keyUp(e));