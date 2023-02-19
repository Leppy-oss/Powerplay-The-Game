export default class Robot {
    cones;
    x;
    y;
    width;
    height;
    phaserObject;
    alliance;

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
}