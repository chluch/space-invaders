//Define Starfield
class Starfield {
    fps: number;
    canvas: null;
    width: number;
    height: number;
    minVelocity: number;
    maxVelocity: number;
    stars: number;
    intervalId: number;
    starDiv!: HTMLElement;

    constructor(
        fps: number,
        canvas: null,
        width: number,
        height: number,
        minVelocity: number,
        maxVelocity: number,
        stars: number,
        intervalId: number) {
        this.fps = fps;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.minVelocity = minVelocity;
        this.maxVelocity = maxVelocity;
        this.stars = stars;
        this.intervalId = intervalId;
    }
}


//Setup actual starfield properties
let starfield: Starfield = new Starfield(
    30, null, 0, 0, 15, 30, 100, 0
);



//Insert starfield said above into a HTML div element
function insertStarfield(div: HTMLElement) {
    starfield.starDiv = div;
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;

}


// Starfield.prototype.initialise = function(div: HTMLElement) {
// this.containerDiv = div; //Make div element the same size as browser window
// this.width = window.innerWidth;
// this.height = window.innerHeight;
// }

