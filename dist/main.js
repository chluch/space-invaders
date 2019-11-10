/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var starfield_1 = __webpack_require__(1);
var config_1 = __webpack_require__(2);
var game_1 = __webpack_require__(3);
var container = document.getElementById('container');
var fps = 60;
var minVelocity = Math.random() * 30 + 5;
var maxVelocity = Math.random() * 50 + minVelocity;
var numOfStars = Math.random() * 200 + 50;
var starfield = new starfield_1.Starfield(container, fps, minVelocity, maxVelocity, numOfStars);
starfield.start();
var space = document.getElementById('gamecontainer');
var canvas = document.createElement('canvas');
canvas.style.height = '100%';
canvas.style.width = '100%';
space.appendChild(canvas);
var game = new game_1.Game(new config_1.Config(), canvas);
game.init();
//  Listen for keyboard events.
window.addEventListener('keydown', function (e) { return game.keyDown(e); });
window.addEventListener('keyup', function (e) { return game.keyUp(e); });
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Star = /** @class */ (function () {
    function Star(x, y, size, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
    }
    return Star;
}());
//Define Starfield
var Starfield = /** @class */ (function () {
    function Starfield(div, fps, minVelocity, maxVelocity, numOfStars) {
        var _this = this;
        this.div = div;
        this.fps = fps;
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.numOfStars = numOfStars;
        this.fps = fps;
        this.canvas = document.createElement('canvas');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stars = [];
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.numOfStars = numOfStars;
        this.intervalId = null;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.div.appendChild(this.canvas);
        window.addEventListener('resize', function (event) {
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
            _this.canvas.width = _this.width;
            _this.canvas.height = _this.height;
            _this.draw();
        });
    }
    Starfield.prototype.start = function () {
        var _this = this;
        for (var i = 0; i < this.numOfStars; i++) {
            this.stars.push(new Star(Math.random() * this.width, Math.random() * this.height, Math.random() * 3 + 1, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity));
        }
        this.intervalId = setInterval(function () {
            _this.update();
            _this.draw();
        }, 1000 / this.fps);
    };
    Starfield.prototype.stop = function () {
        this.stars = [];
        clearInterval(this.intervalId);
    };
    Starfield.prototype.update = function () {
        var dt = 1 / this.fps; //second per frame
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            star.y += dt * star.velocity;
            if (star.y > this.height) {
                this.stars[i] = new Star(Math.random() * this.width, 0, Math.random() * 3 + 1, (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
            }
        }
    };
    Starfield.prototype.draw = function () {
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
            var star = _a[_i];
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    };
    return Starfield;
}());
exports.Starfield = Starfield;
//# sourceMappingURL=starfield.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config(bombRate, bombMinVelocity, bombMaxVelocity, invaderInitialVelocity, invaderCurrentVelocity, invaderCurrentDropDistance, invaderVelocity, invaderNextVelocity, invaderAcceleration, invaderDropDistance, invadersAreDropping, rocketVelocity, rocketMaxFireRate, lastRocketTime, fps, debugMode, invaderRanks, invaderFiles, shipSpeed, levelDifficultyMultiplier, pointsPerInvader, limitLevelIncrease, lives, score, level, limitLevel, levelMultiplier) {
        if (bombRate === void 0) { bombRate = 0.05; }
        if (bombMinVelocity === void 0) { bombMinVelocity = 50; }
        if (bombMaxVelocity === void 0) { bombMaxVelocity = 50; }
        if (invaderInitialVelocity === void 0) { invaderInitialVelocity = 25; }
        if (invaderCurrentVelocity === void 0) { invaderCurrentVelocity = 10; }
        if (invaderCurrentDropDistance === void 0) { invaderCurrentDropDistance = 0; }
        if (invaderVelocity === void 0) { invaderVelocity = { x: -invaderInitialVelocity, y: 0 }; }
        if (invaderNextVelocity === void 0) { invaderNextVelocity = null; }
        if (invaderAcceleration === void 0) { invaderAcceleration = 0; }
        if (invaderDropDistance === void 0) { invaderDropDistance = 20; }
        if (invadersAreDropping === void 0) { invadersAreDropping = false; }
        if (rocketVelocity === void 0) { rocketVelocity = 120; }
        if (rocketMaxFireRate === void 0) { rocketMaxFireRate = 2; }
        if (lastRocketTime === void 0) { lastRocketTime = null; }
        if (fps === void 0) { fps = 50; }
        if (debugMode === void 0) { debugMode = false; }
        if (invaderRanks === void 0) { invaderRanks = 4; }
        if (invaderFiles === void 0) { invaderFiles = 6; }
        if (shipSpeed === void 0) { shipSpeed = 400; }
        if (levelDifficultyMultiplier === void 0) { levelDifficultyMultiplier = 0.2; }
        if (pointsPerInvader === void 0) { pointsPerInvader = 5; }
        if (limitLevelIncrease === void 0) { limitLevelIncrease = 25; }
        if (lives === void 0) { lives = 3; }
        if (score === void 0) { score = 0; }
        if (level === void 0) { level = 1; }
        if (limitLevel === void 0) { limitLevel = (level < limitLevelIncrease ? level : limitLevelIncrease); }
        if (levelMultiplier === void 0) { levelMultiplier = level * levelDifficultyMultiplier; }
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderCurrentVelocity = invaderCurrentVelocity;
        this.invaderCurrentDropDistance = invaderCurrentDropDistance;
        this.invaderVelocity = invaderVelocity;
        this.invaderNextVelocity = invaderNextVelocity;
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
        this.limitLevel = limitLevel;
        this.levelMultiplier = levelMultiplier;
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderCurrentVelocity = invaderCurrentVelocity;
        this.invaderCurrentDropDistance = invaderCurrentDropDistance;
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
        this.limitLevel = limitLevel;
        this.levelMultiplier = levelMultiplier;
    }
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var KEY_SPACE = 32;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var Game = /** @class */ (function () {
    function Game(config, canvas) {
        this.config = config;
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
        this.ctx = this.canvas.getContext('2d');
        this.inputs = new Set();
        this.lastRocketTime = null;
        this.ship = {
            x: this.bounds.left + (this.bounds.right - this.bounds.left) / 2,
            y: this.bounds.bottom,
            width: 20,
            height: 16
        };
        this.rockets = [];
        this.invaders = [];
    }
    Game.prototype.init = function () {
        var _this = this;
        this.intervalId = setInterval(function () { return _this.loop(); }, 1000 / this.config.fps);
    };
    Game.prototype.start = function () {
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
        var ranks = this.config.invaderRanks + 0.1 * this.config.limitLevel;
        var files = this.config.invaderFiles + 0.2 * this.config.limitLevel;
        this.invaders = [];
        for (var rank = 0; rank < ranks; rank++) {
            for (var file = 0; file < files; file++) {
                var invader = {
                    x: (this.width / 2) + ((files / 2 - file) * 100 / files),
                    y: (this.bounds.top + rank * 10) + 3,
                    rank: this.config.invaderRanks + 0.1 * this.config.limitLevel,
                    file: this.config.invaderFiles + 0.2 * this.config.limitLevel,
                    width: 10,
                    height: 6
                };
                this.invaders.push(invader);
            }
        }
    };
    Game.prototype.loop = function () {
        //  Delta t is the time to update/draw.
        this.update();
        this.draw();
    };
    Game.prototype.update = function () {
        switch (this.state.kind) {
            case 'Welcome':
                if (this.inputs.has(KEY_SPACE)) {
                    this.state = { kind: 'Running' };
                    this.start();
                }
                break;
            case 'Running':
                if (this.inputs.has(KEY_LEFT)) {
                    var move = this.config.shipSpeed * this.dt;
                    if (this.ship.x - this.ship.width / 2 - move > this.bounds.left) {
                        this.ship.x -= move;
                    }
                }
                if (this.inputs.has(KEY_RIGHT)) {
                    var move = this.config.shipSpeed * this.dt;
                    if (this.ship.x + this.ship.width / 2 + move < this.bounds.right) {
                        this.ship.x += move;
                    }
                }
                if (this.inputs.has(KEY_SPACE)) {
                    this.fireRocket();
                }
                this.moveRocket();
                this.moveInvaders();
                break;
        }
    };
    Game.prototype.draw = function () {
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
                // this.ctx.shadowOffsetX = 0;
                // this.ctx.shadowOffsetY = 0;
                this.ctx.shadowBlur = 5;
                this.ctx.fillRect(this.ship.x - (this.ship.width / 2), this.ship.y - (this.ship.height / 2), this.ship.width, this.ship.height);
                //draw rockets
                this.ctx.fillStyle = '#ff0000';
                this.ctx.shadowBlur = 0;
                for (var i = 0; i < this.rockets.length; i++) {
                    var rocket = this.rockets[i];
                    this.ctx.fillRect(rocket.x, rocket.y - 2, 1, 4);
                }
                //draw invaders
                this.ctx.fillStyle = '#009999';
                for (var i = 0; i < this.invaders.length; i++) {
                    var invader = this.invaders[i];
                    this.ctx.fillRect(invader.x - invader.width / 2, invader.y - invader.height / 2, invader.width, invader.height);
                }
                break;
            }
        }
    };
    Game.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    Game.prototype.keyDown = function (event) {
        var keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.inputs.add(event.keyCode);
        }
    };
    Game.prototype.keyUp = function (event) {
        var keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            this.inputs.delete(event.keyCode);
        }
    };
    Game.prototype.fireRocket = function () {
        if (this.lastRocketTime === null || ((new Date()).valueOf() - this.lastRocketTime) > (1000 / this.config.rocketMaxFireRate)) {
            var rocket = {
                x: this.ship.x,
                y: this.ship.y - this.ship.height / 2,
                velocity: this.config.rocketVelocity
            };
            //  Add a rocket.
            this.rockets.push(rocket);
            this.lastRocketTime = (new Date()).valueOf();
        }
    };
    Game.prototype.moveRocket = function () {
        for (var _i = 0, _a = this.rockets; _i < _a.length; _i++) {
            var rocket = _a[_i];
            rocket.y -= this.dt * rocket.velocity;
        }
        if (this.rockets.length > 0 && this.rockets[0].y < 0) {
            this.rockets.shift();
        }
    };
    Game.prototype.moveInvaders = function () {
        var hitLeft = false, hitRight = false, hitBottom = false;
        for (var i = 0; i < this.invaders.length; i++) {
            var invader = this.invaders[i];
            var newx = invader.x + this.config.invaderVelocity.x * this.dt;
            var newy = invader.y + this.config.invaderVelocity.y * this.dt;
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
            this.config.invaderCurrentDropDistance += this.config.invaderVelocity.y * this.dt;
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
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map

/***/ })
/******/ ]);