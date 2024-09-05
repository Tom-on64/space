import Player from "./Player.js";
import Planet from "./Planet.js";

let player;
const objects = [];

const SPEED = 200;
const ROT_SPEED = 180;
const GRID_GAP = 300;

const random = (max, min = 0) => {
    return min + Math.random() * (max - min);
}

gfx.start = () => {
    player = new Player(0, 0, 0);
    for (let i = 0; i < 20; i++) {
        const x = random(10_000, -10_000);
        const y = random(10_000, -10_000);
        const r = random(800, 300);
        objects.push(new Planet(x, y, r, "#00ffff"));
    }
}

gfx.update = (dt) => {
    objects.forEach(o => o.update(player));
    if    (gfx.input.keys["w"] || gfx.input.keys["ArrowUp"]) player.move(SPEED * dt);
    if  (gfx.input.keys["s"] || gfx.input.keys["ArrowDown"]) player.move(-SPEED * dt);
    if  (gfx.input.keys["a"] || gfx.input.keys["ArrowLeft"]) player.rotate(-ROT_SPEED * dt);
    if (gfx.input.keys["d"] || gfx.input.keys["ArrowRight"]) player.rotate(ROT_SPEED * dt);
    // Mouse move
    if (gfx.input.mouse.left) {
        player.move(SPEED * dt);
        const x = gfx.input.mouse.cx - gfx.input.mouse.x;
        const y = gfx.input.mouse.cy - gfx.input.mouse.y;
        const a = Math.PI*2 - Math.atan2(x, y) - Math.PI/2;

        player.a = a;
    }

    player.update(dt);
}

gfx.render = () => {
    gfx.clear();

    // BG Grid
    const vgridLines = Math.floor(gfx.width / GRID_GAP) + 2;
    const hgridLines = Math.floor(gfx.height / GRID_GAP) + 2;
    for (let i = 0; i < vgridLines; i++) {
        const x = i * GRID_GAP - (player.x % GRID_GAP);
        gfx.line(x, 0, x, gfx.height, "#6b6b6b");
    }
    for (let i = 0; i < hgridLines; i++) {
        const y = i * GRID_GAP - (player.y % GRID_GAP);
        gfx.line(0, y, gfx.width, y, "#6b6b6b");
    }

    // Objects
    objects.forEach(o => o.render(player));
    
    // Player
    player.render();

    // Mouse thing
    if (gfx.input.mouse.left) {
        const x = gfx.input.mouse.cx - gfx.input.mouse.x;
        const y = gfx.input.mouse.cy - gfx.input.mouse.y;
        const a = Math.PI*2 - Math.atan2(x, y) - Math.PI/2;
        const r = Math.sqrt(x*x+y*y);
        gfx.line(
            gfx.input.mouse.cx, gfx.input.mouse.cy, 
            gfx.input.mouse.x, gfx.input.mouse.y,
            "#00ff00");
        gfx.circle(gfx.input.mouse.cx, gfx.input.mouse.cy, r, "#00ff00", false, 2);
    }

    // TODO: make this better
    gfx.font(12, "system-ui");
    gfx.text("Controls: w&s - move, a&d - rotate", 20, 20, "#d6d6d6");
    gfx.font(24, "system-ui");
    gfx.text(`X: ${player.x.toFixed(2)}`, 20, gfx.height / 8 * 7, "#ffffff");
    gfx.text(`Y: ${player.y.toFixed(2)}`, 20, gfx.height / 8 * 7 + 24, "#ffffff");
    gfx.text(`V: ${Math.sqrt(player.vx*player.vx + player.vy*player.vy).toFixed(2)}`, 20, gfx.height / 8 * 7 + 24*2, "#ffffff");
}

gfx.init();

