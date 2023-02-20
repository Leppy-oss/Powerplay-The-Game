import Phaser from 'phaser';
import Junction from './obj/Junction';
import Robot from './obj/Robot'
import { JunctionType } from './obj/JunctionType';

export default class HomeScreen extends Phaser.Scene {
    FIELD_DIMENSION = 300;
    speed = 50;
    cursors;
    junctionBodies;
    keys;
    leftP1;
    rightP1;
    upP1;
    downP1;

    junctions = [
        //y value -this.FIELD_DIMENSION * 2.0/3.0
        new Junction(0, -this.FIELD_DIMENSION * 2.0 / 3.0, -this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.GROUND),
        new Junction(0, -this.FIELD_DIMENSION / 3, -this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.LOW),
        new Junction(0, 0.0, -this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.GROUND),
        new Junction(0, this.FIELD_DIMENSION / 3.0, -this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.LOW),
        new Junction(0, this.FIELD_DIMENSION * 2.0 / 3.0, -this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.GROUND),
        //y value -this.FIELD_DIMENSION/3.0
        new Junction(0, -this.FIELD_DIMENSION * 2.0 / 3.0, -this.FIELD_DIMENSION / 3.0, JunctionType.LOW),
        new Junction(0, -this.FIELD_DIMENSION / 3, -this.FIELD_DIMENSION / 3.0, JunctionType.MID),
        new Junction(0, 0.0, -this.FIELD_DIMENSION / 3.0, JunctionType.HIGH),
        new Junction(0, this.FIELD_DIMENSION / 3.0, -this.FIELD_DIMENSION / 3.0, JunctionType.MID),
        new Junction(0, this.FIELD_DIMENSION * 2.0 / 3.0, -this.FIELD_DIMENSION / 3.0, JunctionType.LOW),
        //y value 0.0
        new Junction(0, -this.FIELD_DIMENSION * 2.0 / 3.0, 0.0, JunctionType.GROUND),
        new Junction(0, -this.FIELD_DIMENSION / 3, 0.0, JunctionType.HIGH),
        new Junction(0, 0.0, 0.0, JunctionType.GROUND),
        new Junction(0, this.FIELD_DIMENSION / 3.0, 0.0, JunctionType.HIGH),
        new Junction(0, this.FIELD_DIMENSION * 2.0 / 3.0, 0.0, JunctionType.GROUND),
        //y value this.FIELD_DIMENSION/3.0
        new Junction(0, -this.FIELD_DIMENSION * 2.0 / 3.0, this.FIELD_DIMENSION / 3.0, JunctionType.LOW),
        new Junction(0, -this.FIELD_DIMENSION / 3, this.FIELD_DIMENSION / 3.0, JunctionType.MID),
        new Junction(0, 0.0, this.FIELD_DIMENSION / 3.0, JunctionType.HIGH),
        new Junction(0, this.FIELD_DIMENSION / 3.0, this.FIELD_DIMENSION / 3.0, JunctionType.MID),
        new Junction(0, this.FIELD_DIMENSION * 2.0 / 3.0, this.FIELD_DIMENSION / 3.0, JunctionType.LOW),
        //y value this.FIELD_DIMENSION * 2.0/3.0
        new Junction(0, -this.FIELD_DIMENSION * 2.0 / 3.0, this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.GROUND),
        new Junction(0, -this.FIELD_DIMENSION / 3, this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.LOW),
        new Junction(0, 0.0, this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.GROUND),
        new Junction(0, this.FIELD_DIMENSION / 3.0, this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.LOW),
        new Junction(0, this.FIELD_DIMENSION * 2.0 / 3.0, this.FIELD_DIMENSION * 2.0 / 3.0, JunctionType.GROUND)
    ];

    robots;

    constructor() {
        super('hello-world');
    }

    preload() {
        this.load.image('logo', '/8565CL.png');
        this.load.image('sky', '/resources/background/season-2022-powerplay/field-2022-official.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
        this.load.image('junction', '/junction.png');
    }

    create() {
        this.robots = [
            new Robot(0, this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 14, 14, "BLUE"),
            new Robot(0, this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 14, 14, "RED"),
            new Robot(0, 3 * this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 14, 14, "BLUE"),
            new Robot(0, 3 * this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 14, 14, "RED")
        ];
        this.leftP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.downP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.upP1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION, 'sky').setScale(2 * this.FIELD_DIMENSION / 2270, 2 * this.FIELD_DIMENSION / 2270).setAlpha(0.5);

        const particles = this.add.particles('red');

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        });

        const logo = this.physics.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION / 3, 'logo').setScale(0.5, 0.5);
        this.cursors = this.game.input.defaultCursor;

        let logoScl = 2;
        let junctionScale = 0.1;

        logo.setVelocity(100 * logoScl, 200 * logoScl);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        this.junctions.forEach(junction => {
            junction.x += this.FIELD_DIMENSION;
            junction.y += this.FIELD_DIMENSION;
            junction.setPhaserObject(this.physics.add.image(junction.x, junction.y, 'junction').setScale(junctionScale));
            console.log("Created a new junction at (" + Math.round(junction.x) + ", " + Math.round(junction.y) + ") with type " + junction.type[2] + " and " + junction.cones + " cones.");
        });
        this.junctionBodies = this.physics.add.staticGroup();
        this.junctionBodies.enableBody = true;
        this.physics.add.staticGroup();

        this.robots.forEach(robot => {
            robot.width *= this.FIELD_DIMENSION / 6 / 24;
            robot.height *= this.FIELD_DIMENSION / 6 / 24;
            robot.setPhaserObject(this.add.rectangle(robot.x, robot.y, robot.width, robot.height, robot.alliance == "RED" ? 0xFF0000 : 0x0000FF, 0.5));
        });

        logo.setDepth(1);

        emitter.startFollow(logo);
        this.leftP1.on('down', () => this.robots[0].left = true);
        this.leftP1.on('up', () => {
            this.robots[0].left = false;
            console.log("left up");
        });
        this.rightP1.on('down', () => {
            this.robots[0].right = true;
            console.log("right down");
        });
        this.rightP1.on('up', () => this.robots[0].right = false);
        this.downP1.on('down', () => this.robots[0].down = true);
        this.downP1.on('up', () => this.robots[0].down = false);
        this.upP1.on('down', () => this.robots[0].up = true);
        this.upP1.on('up', () => this.robots[0].up = false);
    }

    update(time, delta) {
        for (let i = 0; i < this.junctions.length; i++) this.junctions[i].update(time, delta);
        for (let i = 0; i < this.robots.length; i++) this.robots[i].update(time, delta);
        console.log(this.robots[0].dx, this.robots[0].dy);
    }
}