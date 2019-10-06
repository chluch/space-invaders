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
game.start();
//  Listen for keyboard events.
window.addEventListener('keydown', function (e) { return game.keyDown(e); });
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
    function Config(bombRate, bombMinVelocity, bombMaxVelocity, invaderInitialVelocity, invaderAcceleration, invaderDropDistance, rocketVelocity, rocketMaxFireRate, fps, debugMode, invaderRanks, invaderFiles, shipSpeed, levelDifficultyMultiplier, pointsPerInvader, limitLevelIncrease, lives) {
        if (bombRate === void 0) { bombRate = 0.05; }
        if (bombMinVelocity === void 0) { bombMinVelocity = 50; }
        if (bombMaxVelocity === void 0) { bombMaxVelocity = 50; }
        if (invaderInitialVelocity === void 0) { invaderInitialVelocity = 25; }
        if (invaderAcceleration === void 0) { invaderAcceleration = 0; }
        if (invaderDropDistance === void 0) { invaderDropDistance = 20; }
        if (rocketVelocity === void 0) { rocketVelocity = 120; }
        if (rocketMaxFireRate === void 0) { rocketMaxFireRate = 2; }
        if (fps === void 0) { fps = 50; }
        if (debugMode === void 0) { debugMode = false; }
        if (invaderRanks === void 0) { invaderRanks = 5; }
        if (invaderFiles === void 0) { invaderFiles = 10; }
        if (shipSpeed === void 0) { shipSpeed = 120; }
        if (levelDifficultyMultiplier === void 0) { levelDifficultyMultiplier = 0.2; }
        if (pointsPerInvader === void 0) { pointsPerInvader = 5; }
        if (limitLevelIncrease === void 0) { limitLevelIncrease = 25; }
        if (lives === void 0) { lives = 3; }
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderAcceleration = invaderAcceleration;
        this.invaderDropDistance = invaderDropDistance;
        this.rocketVelocity = rocketVelocity;
        this.rocketMaxFireRate = rocketMaxFireRate;
        this.fps = fps;
        this.debugMode = debugMode;
        this.invaderRanks = invaderRanks;
        this.invaderFiles = invaderFiles;
        this.shipSpeed = shipSpeed;
        this.levelDifficultyMultiplier = levelDifficultyMultiplier;
        this.pointsPerInvader = pointsPerInvader;
        this.limitLevelIncrease = limitLevelIncrease;
        this.lives = lives;
        this.bombRate = bombRate;
        this.bombMinVelocity = bombMinVelocity;
        this.bombMaxVelocity = bombMaxVelocity;
        this.invaderInitialVelocity = invaderInitialVelocity;
        this.invaderAcceleration = invaderAcceleration;
        this.invaderDropDistance = invaderDropDistance;
        this.rocketVelocity = rocketVelocity;
        this.rocketMaxFireRate = rocketMaxFireRate;
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
        this.input = [];
        this.ship = {
            x: this.bounds.left + (this.bounds.right - this.bounds.left) / 2,
            y: this.bounds.bottom,
            width: 20,
            height: 16
        };
    }
    Game.prototype.start = function () {
        var _this = this;
        this.intervalId = setInterval(function () { return _this.loop(); }, 1000 / this.config.fps);
    };
    Game.prototype.loop = function () {
        //  Delta t is the time to update/draw.
        this.update();
        this.draw();
    };
    Game.prototype.update = function () {
        var key = this.input.pop();
        switch (this.state.kind) {
            case 'Welcome':
                if (key === KEY_SPACE) {
                    this.state = { kind: 'Running' };
                }
                break;
            case 'Running':
                if (key === KEY_LEFT) {
                    this.ship.x -= this.config.shipSpeed * this.dt;
                }
                if (key === KEY_RIGHT) {
                    this.ship.x += this.config.shipSpeed * this.dt;
                }
                break;
        }
    };
    Game.prototype.draw = function () {
        switch (this.state.kind) {
            case 'Welcome': {
                this.ctx.clearRect(0, 0, this.width, this.height);
                console.log("bounds: " + this.bounds);
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
    };
    Game.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    Game.prototype.keyDown = function (event) {
        var keys = [KEY_SPACE, KEY_LEFT, KEY_RIGHT];
        if (keys.indexOf(event.keyCode) !== -1) {
            console.log(this);
            console.log(this.input);
            this.input.push(event.keyCode);
        }
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map

/***/ })
/******/ ]);