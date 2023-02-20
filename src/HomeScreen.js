import Phaser from 'phaser';
import Junction from './obj/Junction';
import Robot from './obj/Robot'
import { JunctionType } from './obj/JunctionType';

export default class HomeScreen extends Phaser.Scene {
    FIELD_DIMENSION = 300;
    speed = 50;
    junctionBodies;
    robotBodies;

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
        this.load.image('red', '/particles/red.png');
        this.load.image('blue', '/particles/blue.png');
        this.load.image('redlight', '/robots/RedLightRobot.png');
        this.load.image('bluelight', '/robots/BlueLightRobot.png');
        this.load.image('junction', '/junction.png');
    }

    create() {
        this.robots = [
            new Robot(0, this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 12, 12, "BLUE"),
            new Robot(0, this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 12, 12, "RED"),
            new Robot(0, 3 * this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 12, 12, "BLUE"),
            new Robot(0, 3 * this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 12, 12, "RED")
        ];

        this.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION, 'sky').setScale(2 * this.FIELD_DIMENSION / 2270, 2 * this.FIELD_DIMENSION / 2270).setAlpha(0.5);

        const redParticles = this.add.particles('red');
        const blueParticles = this.add.particles('blue');

        // const logo = this.physics.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION / 3, 'logo').setScale(0.5, 0.5);

        // let logoScl = 2;
        let junctionScale = 0.1;
        this.junctionBodies = this.physics.add.staticGroup();
        this.robotBodies = this.physics.add.group();
        // this.junctionBodies.enableBody = true;
        // this.physics.add.staticGroup();

        /*
        logo.setVelocity(100 * logoScl, 200 * logoScl);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        */

        this.junctions.forEach(junction => {
            junction.x += this.FIELD_DIMENSION;
            junction.y += this.FIELD_DIMENSION;
            let phaserObject = this.junctionBodies.create(junction.x, junction.y, 'junction').setScale(junctionScale).refreshBody();
            phaserObject.body.setCircle(9.6);
            junction.setPhaserObject(phaserObject);
            console.log("Created a new junction at (" + Math.round(junction.x) + ", " + Math.round(junction.y) + ") with type " + junction.type[2] + " and " + junction.cones + " cones.");
        });

        this.robots.forEach(robot => {
            const emitter = (robot.alliance == 'BLUE'? redParticles : blueParticles).createEmitter({
                speed: 50,
                scale: { start: 0.5, end: 0 },
                blendMode: 'ADD',
            });
            robot.width *= this.FIELD_DIMENSION / 6 / 12;
            robot.height *= this.FIELD_DIMENSION / 6 / 12;
            let phaserObject = this.robotBodies.create(robot.x, robot.y, robot.alliance == 'RED' ? 'redlight' : 'bluelight').setScale(robot.width / 192, robot.height / 192).refreshBody(); // this.add.rectangle(robot.x, robot.y, robot.width, robot.height, robot.alliance == "RED" ? 0xFF0000 : 0x0000FF, 0.5);
            phaserObject.setBounce(0.1);
            phaserObject.setCollideWorldBounds(true);
            phaserObject.setDrag(robot.friction, robot.friction);
            phaserObject.setFriction(robot.friction/2, robot.friction/2);
            phaserObject.setMaxVelocity(robot.speedCap, robot.speedCap);
            phaserObject.setMass(robot.mass);
            robot.setPhaserObject(phaserObject);
            emitter.startFollow(robot.phaserObject);
        });
        this.physics.add.collider(this.robotBodies, this.junctionBodies);
        this.physics.add.collider(this.robotBodies, this.robotBodies);

        // logo.setDepth(1);

    }

    update(time, delta) {
        let cursors = this.input.keyboard.createCursorKeys();
        let robotP1 = this.robots[0].phaserObject;
        robotP1.setAcceleration(0, 0);
        if (cursors.left.isDown) robotP1.setAccelerationX(-this.robots[0].acc);
        if (cursors.right.isDown) robotP1.setAccelerationX(this.robots[0].acc);
        if (cursors.down.isDown) robotP1.setAccelerationY(this.robots[0].acc);
        if (cursors.up.isDown) robotP1.setAccelerationY(-this.robots[0].acc);
        if (cursors.space.isDown) robotP1.setAngularVelocity(5);
        for (let i = 0; i < this.junctions.length; i++) this.junctions[i].update(time, delta);
        // for (let i = 0; i < this.robots.length; i++) this.robots[i].update(time, delta);
        // console.log(this.robots[0].dx, this.robots[0].dy);
    }
}