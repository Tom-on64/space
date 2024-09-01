export default class Obj {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
    }

    /* @abstract */
    draw(cx, cy) {}

    /* @abstract */
    update(p) {}

    render(p) {
        const x = gfx.width/2 - p.x + this.x;
        const y = gfx.height/2 - p.y + this.y;

        this.draw(x, y);
    }
}
