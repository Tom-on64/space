import Obj from "./Obj.js";

export default class Planet extends Obj {
    constructor(x, y, r, c) {
        super(x, y);
        this.r = r;
        this.c = c;
    }

    update(p) {
        // Check bounding box
        if (p.x > this.x - this.r &&
            p.x < this.x + this.r &&
            p.y > this.y - this.r &&
            p.y < this.y + this.r) {
            // In planets bounding box -> check if in circle
            const x = Math.abs(this.x - p.x);
            const y = Math.abs(this.y - p.y);
            const d = Math.sqrt(x*x + y*y); // Distance from center

            if (d <= this.r) { // Collision
                p.vx = 0;
                p.vy = 0;

                p.x -= Math.sign(this.x - p.x);
                p.y -= Math.sign(this.y - p.y);
            }
        }
    }

    draw(cx, cy) {
        gfx.circle(cx, cy, this.r, this.c, false, 4)
    }
}

