const _canvas = document.getElementById("canvas");

const gfx = {
    _canvas,
    _ctx: _canvas.getContext("2d"),
    /* Properties */
    width: 0,
    height: 0,
    /* Input */
    input: {
        keys: {},
        mouse: { x: 0, y: 0, cx: 0, cy: 0, left: false, middle: false, right: false },
    },
    /* Methods */
    clear(color = "#000000") {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(0, 0, this.width, this.height);
    },
    pixel(x, y, color) {
        this._ctx.fillStyle = color;
        this._ctx.fillRect(x, y, 1, 1);
    },
    line(x1, y1, x2, y2, color, w = 1) {
        this._ctx.strokeStyle = color;
        this._ctx.lineWidth = w;
        this._ctx.beginPath();
        this._ctx.moveTo(x1, y1);
        this._ctx.lineTo(x2, y2);
        this._ctx.stroke();
    },
    rect(x, y, w, h, color, fill = true, lw = 1) {
        if (fill) {
            this._ctx.fillStyle = color;
            this._ctx.fillRect(x, y, w, h);
        } else {
            this._ctx.strokeStyle = color;
            this._ctx.lineWidth = lw;
            this._ctx.strokeRect(x, y, w, h);
        }
    },
    circle(x, y, r, color, fill = true, w = 1) {
        if (fill) this._ctx.fillStyle = color;
        else {
            this._ctx.strokeStyle = color;
            this._ctx.lineWidth = w;
        }

        this._ctx.beginPath();
        this._ctx.arc(x, y, r, 0, 2 * Math.PI);
        if (fill) this._ctx.fill();
        else this._ctx.stroke();
    },
    font(px, family, bold = false, italic = false) {
        const s = `${bold ? "bold " : ""}${italic ? "italic " : ""}${px}px ${family}`;
        this._ctx.font = s;
    },
    text(s, x, y, color, fill = true, w = 1) {
        if (fill) {
            this._ctx.fillStyle = color;
            this._ctx.fillText(s, x, y);
        } else {
            this._ctx.strokeStyle = color;
            this._ctx.lineWidth = w;
            this._ctx.strokeText(s, x, y);
        }
    },
    start() {}, 
    update(dt) {},
    render() {},
    init() {
        this.start();
        this._update();
        this._resize();
    },
    /* Private Methods */
    _timestamp: 0,
    _update(time = 0) {
        const dt = time - this._timestamp;
        this._timestamp = time;
        requestAnimationFrame(this._update.bind(this));

        this.render();
        this.update(dt/1000); // dt in miliseconds
    },
    _resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this._canvas.width = this.width;
        this._canvas.height = this.height;
    },
}

/* Input Manager */
_canvas.addEventListener("mousemove", (e) => {
    gfx.input.mouse.x = e.offsetX;
    gfx.input.mouse.y = e.offsetY;
});
_canvas.addEventListener("mousedown", (e) => {
    if (e.button === 0) gfx.input.mouse.left = true;
    else if (e.button === 1) gfx.input.mouse.middle = true;
    else if (e.button === 2) gfx.input.mouse.right = true;
 
    gfx.input.mouse.cx = e.offsetX;
    gfx.input.mouse.cy = e.offsetY;
});
_canvas.addEventListener("mouseup", (e) => {
    if (e.button === 0) gfx.input.mouse.left = false;
    else if (e.button === 1) gfx.input.mouse.middle = false;
    else if (e.button === 2) gfx.input.mouse.right = false;
});
_canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    gfx.input.mouse.left = true;
    gfx.input.mouse.cx = touch.clientX - _canvas.getBoundingClientRect().left;
    gfx.input.mouse.cy = touch.clientY - _canvas.getBoundingClientRect().top;
});
_canvas.addEventListener("touchend", (e) => {
    gfx.input.mouse.left = false;
});
_canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    gfx.input.mouse.x = touch.clientX - _canvas.getBoundingClientRect().left;
    gfx.input.mouse.y = touch.clientY - _canvas.getBoundingClientRect().top;
});
document.addEventListener("keydown", (e) => { gfx.input.keys[e.key] = true; });
document.addEventListener("keyup", (e) => { gfx.input.keys[e.key] = false; });
window.addEventListener("resize", (e) => { gfx._resize(); });

