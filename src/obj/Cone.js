import { JunctionType } from "./JunctionType";

export default class Junction {
    x = 0;
    y = 0;
    color;
    phaserObject;

    constructor(cones, x, y, color) {
        this.cones = cones;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    setType(type) {
        this.type = type;
    }

    setPhaserObject(phaserObject) {
        this.phaserObject = phaserObject;
    }

    addCone() {
        this.cones++;
    }

    addCones(cones) {
        this.cones += cones;
    }

    removeCone() {
        this.cones--;
    }

    removeCones(cones) {
        this.cones -= cones;
    }

    update(time, delta) {
    }
}