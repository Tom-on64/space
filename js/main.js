import Player from "./Player.js";
import Planet from "./Planet.js";

let player;
const objects = [];

const SPEED = 200;
const ROT_SPEED = 180;
const GRID_GAP = 350;

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
    // objects.push(new Obj(0, 0, 15_000, "#ff0000")); // TODO: draw border
}

gfx.update = (dt) => {
    objects.forEach(o => o.update(player));
    if (gfx.input.keys["w"]) player.move(SPEED * dt);
    if (gfx.input.keys["s"]) player.move(-SPEED * dt);
    if (gfx.input.keys["a"]) player.rotate(-ROT_SPEED * dt);
    if (gfx.input.keys["d"]) player.rotate(ROT_SPEED * dt);

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

    // TODO: make this better
    gfx.font(12, "system-ui");
    gfx.text("Controls: w&s - move, a&d - rotate", 20, 20, "#d6d6d6");
    gfx.font(24, "system-ui");
    gfx.text(`X: ${Math.floor(player.x)}`, 20, gfx.height / 8 * 7, "#ffffff");
    gfx.text(`Y: ${Math.floor(player.y)}`, 20, gfx.height / 8 * 7 + 24, "#ffffff");
    gfx.text(`V: ${Math.floor(Math.abs(player.vx) + Math.abs(player.vy))}`, 20, gfx.height / 8 * 7 + 24*2, "#ffffff");
}

gfx.init();

