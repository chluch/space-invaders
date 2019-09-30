"use strict";
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
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = "#ffffff";
        for (var _i = 0, _a = this.stars; _i < _a.length; _i++) {
            var star = _a[_i];
            ctx.fillRect(star.x, star.y, star.size, star.size);
        }
    };
    return Starfield;
}());
var container = document.getElementById('container');
var fps = 60;
var minVelocity = Math.random() * 30 + 5;
var maxVelocity = Math.random() * 50 + minVelocity;
var numOfStars = Math.random() * 1000 + 50;
var starfield = new Starfield(container, fps, minVelocity, maxVelocity, numOfStars);
starfield.start();
