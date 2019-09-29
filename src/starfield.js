//Define Starfield
var Starfield = /** @class */ (function () {
    function Starfield(fps, canvas, width, height, minVelocity, maxVelocity, stars, intervalId) {
        this.fps = fps;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.stars = stars;
        this.intervalId = intervalId;
    }
    return Starfield;
}());
//Setup actual starfield properties
var starfield = new Starfield(30, null, 0, 0, 15, 30, 100, 0);
//Insert starfield said above into a HTML div element
Starfield.prototype.initialise = function (div) {
    this.containerDiv = div; //Make div element the same size as browser window
    this.width = window.innerWidth;
    this.height = window.innerHeight;
};
//Run starfield
Starfield.prototype.start = function () {
};
//# sourceMappingURL=starfield.js.map