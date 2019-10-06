class Star {
    constructor(
        public x: number,
        public y: number,
        public size: number,
        public velocity: number
    ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = velocity;
    }
}

//Define Starfield
export class Starfield {

    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    stars: Array<Star>;
    intervalId: number | null;

    constructor(
        private div: HTMLElement,
        private fps: number,
        private minVelocity: number,
        private maxVelocity: number,
        private numOfStars: number) {

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

        window.addEventListener('resize', (event) => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.draw();
        });
    }

    start() {
        for (let i = 0; i < this.numOfStars; i++) {
            this.stars.push(new Star(
                Math.random() * this.width,
                Math.random() * this.height,
                Math.random() * 3 + 1,
                (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity
            ));
        }
        this.intervalId = setInterval(() => {
            this.update();
            this.draw();
        }, 1000 / this.fps);
    }

    stop() {
        this.stars = [];
        clearInterval(this.intervalId!);
    }

    update() {
        const dt = 1 / this.fps; //second per frame
        for (let i = 0; i < this.stars.length; i++) {
            let star = this.stars[i];
            star.y += dt * star.velocity;

            if (star.y > this.height) {
                this.stars[i] = new Star(
                    Math.random() * this.width,
                    0,
                    Math.random() * 3 + 1,
                    (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity);
            }
        }
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx!.fillStyle = '#000000';
        ctx!.fillRect(0, 0, this.width, this.height);
        ctx!.fillStyle = '#ffffff';
        for (const star of this.stars) {
            ctx!.fillRect(star.x, star.y, star.size, star.size);
        }
    }
}
