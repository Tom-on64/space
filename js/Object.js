export default class Obj {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    render(p) {
        const x = gfx.width/2 - p.x + this.x;
        const y = gfx.height/2 - p.y + this.y;

        gfx.circle(x, y, this.r, this.c, false, 8);
    }
}
