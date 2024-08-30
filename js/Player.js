const MAX_VEL = 1000;
const BORDER_RAD = 15_000;

export default class Player {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.a = a * (Math.PI / 180);
        this.vx = 0;
        this.vy = 0;
    }

    rotate(n) {
        this.a += n * (Math.PI / 180);
    }

    move(n) {
        this.vx += Math.cos(this.a) * n;
        this.vy += Math.sin(this.a) * n;

        // Limit velocity
        if (Math.abs(this.vx) > MAX_VEL) this.vx = Math.sign(this.vx) * MAX_VEL;
        if (Math.abs(this.vy) > MAX_VEL) this.vy = Math.sign(this.vy) * MAX_VEL;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Limit position
        if (Math.sqrt(this.x * this.x + this.y * this.y) > BORDER_RAD) {
            this.vx = 0;
            this.vy = 0;

            this.x -= Math.sign(this.x);
            this.y -= Math.sign(this.y);
        }
    }

    render() {
        const x = gfx.width/2;
        const y = gfx.height/2;

        gfx.circle(x, y, 10, "#00ff00", false, 2);
        gfx.line(x, y, x + Math.cos(this.a) * 10, y + Math.sin(this.a) * 10, "#ff0000", 2);
    }
}

