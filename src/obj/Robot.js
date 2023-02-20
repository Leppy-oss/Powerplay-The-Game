export default class Robot {
    cones;
    x;
    y;
    width;
    height;
    phaserObject;
    alliance;
    left = false;
    right = false;
    down = false;
    up = false;
    dx = 0;
    dx2 = 0;
    dy = 0;
    dy2 = 0;
    acc = 2000;
    friction = 50;
    speedCap = 200;

    constructor(cones, x, y, width, height, alliance) {
        this.cones = cones;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alliance = alliance;
    }

    setPhaserObject(phaserObject) {
        this.phaserObject = phaserObject;
    }

    update(time, delta) {
        this.dx2 = 0;
        this.dy2 = 0;
        if (this.left) this.dx2 = -this.acc;
        if (this.right) this.dx2 = this.acc;
        if (this.down) this.dy2 = this.acc;
        if (this.up) this.dy2 = -this.acc;
        delta /= 1000.0;
        if (((this.dx < this.speedCap && (this.right && this.left || this.right))) || (((this.dx > -this.speedCap) && (this.left && this.right || this.left)))) {
            this.dx += this.dx2 * delta;
        }
        if (Math.abs(this.dy) < this.speedCap) this.dy += this.dy2 * delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;

        this.phaserObject.x = this.x;
        this.phaserObject.y = this.y;
        if (this.dx > 0 && !this.left && !this.right) this.dx -= this.friction;
        else if (this.dx < 0 && !this.left && !this.right) this.dx += this.friction;
        if (Math.abs(this.dx) < this.friction && !this.left && !this.right) this.dx = 0;
        if (this.dy > 0 && !this.down && !this.up) this.dy -= this.friction;
        else if (this.dy < 0 && !this.down && !this.up) this.dy += this.friction;
        if (Math.abs(this.dy) < this.friction && !this.down && !this.up) this.dy = 0;
    }
}