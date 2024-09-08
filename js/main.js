import Player from "./Player.js";
import Planet from "./Planet.js";

const loadFont = async () => {
    const fnt = new FontFace("UbuntuMono", "url(UbuntuMono-Regular.ttf)", {
        style: "normal",
        weight: 400,
    });
    await fnt.load();
    document.fonts.add(fnt);
}

let player;
const objects = [];

const SPEED = 200;
const ROT_SPEED = 180;
const GRID_GAP = 300;
const THRUST_RAD = 250;

const random = (max, min = 0) => {
    return min + Math.random() * (max - min);
}

const renderUi = () => {
    gfx.font(24, "UbuntuMono");
    let textLoc = gfx.height / 8 * 7;
    const fmt = (n) => ((Math.sign(n) == -1 ? '-' : '+') + Math.abs(n.toFixed(0))).padStart(5); // "%+5d" - C equivalent
    const vel = Math.sqrt(player.vx*player.vx + player.vy*player.vy);

    if (player.thrust) {
        gfx.text(`THR: ${Math.floor(player.thrust*100)}%`, 20, textLoc - 24, "#ffffff");
    }
    gfx.text(`POS: <${fmt(player.x)}, ${fmt(player.y)}>`, 20, textLoc, "#ffffff");
    gfx.text(`VEL: ${vel.toFixed(2).padStart(5)}`, 20, textLoc + 24, "#ffffff");
}

gfx.start = () => {
    loadFont();
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
    
    // Mouse move
    if (gfx.input.mouse.left) {
        const x = gfx.input.mouse.cx - gfx.input.mouse.x;
        const y = gfx.input.mouse.cy - gfx.input.mouse.y;
        const a = Math.PI*2 - Math.atan2(x, y) - Math.PI/2;
        player.thrust = Math.sqrt(x*x + y*y);
        if (player.thrust > THRUST_RAD) player.thrust = THRUST_RAD;
        player.thrust /= THRUST_RAD;

        player.a = a;
    } else { player.thrust = 0; }

    if    (gfx.input.keys["w"] || gfx.input.keys["ArrowUp"]) player.thrust = 1;
    if  (gfx.input.keys["s"] || gfx.input.keys["ArrowDown"]) player.thrust = -1;
    if  (gfx.input.keys["a"] || gfx.input.keys["ArrowLeft"]) player.rotate(-ROT_SPEED * dt);
    if (gfx.input.keys["d"] || gfx.input.keys["ArrowRight"]) player.rotate(ROT_SPEED * dt);

    player.move(SPEED * dt * player.thrust);
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

    objects.forEach(o => o.render(player));
    player.render();
    renderUi();

    // Mouse thing
    if (gfx.input.mouse.left) {
        const x = gfx.input.mouse.cx - gfx.input.mouse.x;
        const y = gfx.input.mouse.cy - gfx.input.mouse.y;
        const a = Math.PI*2 - Math.atan2(x, y) - Math.PI/2;
        let r = Math.sqrt(x*x+y*y);
        if (r > THRUST_RAD) r = THRUST_RAD;

        gfx.circle(gfx.input.mouse.cx, gfx.input.mouse.cy, 4, "#00ff00");
        gfx.line(gfx.input.mouse.cx, gfx.input.mouse.cy, gfx.input.mouse.cx + Math.cos(a) * r, gfx.input.mouse.cy + Math.sin(a) * r, "#00ff00", 2);
        gfx.circle(gfx.input.mouse.cx, gfx.input.mouse.cy, r, "#00ff00", false, 2);
    }
}

gfx.init();

