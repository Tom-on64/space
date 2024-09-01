const MAX_VEL = 2000;
const BORDER_RAD = 15_000;
const PARTICLE_LIMIT = 100;
const PARTICLE_INTERVAL = 100; // ms

export default class Player {
    constructor(x, y, a) {
        this.x = x;
        this.y = y;
        this.a = a * (Math.PI / 180);
        this.vx = 0;
        this.vy = 0;

        this.partTimer = 0;
        this.particles = [];
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

        if (this.partTimer >= PARTICLE_INTERVAL) {
            this.partTimer = 0;
            this.particles.push([this.x, this.y]);
            if (this.particles.length > PARTICLE_LIMIT) this.particles.shift();
        } else this.partTimer += dt * 1000; // make it miliseconds
    }

    render() {
        // center x/y
        const cx = gfx.width/2;
        const cy = gfx.height/2;

        // Particles
        this.particles.forEach(([x, y]) => {
            gfx.rect(cx - this.x + x, cy - this.y + y, 2, 2, "#ddd");
        });

        // Player
        const r = 15
        gfx.circle(cx, cy, r, "#00ff00", false, 2);
        gfx.circle(cx, cy, r, "#00ff0055");
        gfx.line(cx, cy, cx + Math.cos(this.a) * (r+4), cy + Math.sin(this.a) * (r+4), "#ff0000", 2);

        // Border
        gfx.circle(cx - this.x, cy - this.y, BORDER_RAD, "#e8230077", false, 8);
    }
}

