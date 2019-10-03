// import { Config } from './config';
// import { Game } from './game';

const space = document.getElementById('gamecontainer')!;
const canvas = document.createElement('canvas')!;
space.appendChild(canvas);
let thisGame = new Game(new Config(), canvas);
thisGame.start();