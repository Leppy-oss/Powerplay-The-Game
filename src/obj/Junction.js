import { JunctionType } from "./JunctionType";

export default class Junction {
    cones = 0;
    x = 0;
    y = 0;
    phaserObject;
    type = JunctionType.GROUND;

    constructor(cones, x, y, type) {
        this.cones = cones;
        this.x = x;
        this.y = y;

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