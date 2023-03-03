import Phaser from 'phaser';
import Junction from './obj/Junction';
import Bobot from './obj/Bobot'
import { JunctionType } from './obj/JunctionType';
import Robot from './obj/Robot';

export default class HomeScreen extends Phaser.Scene {
    FIELD_DIMENSION = 300;
    speed = 50;
    junctionBodies;
    robotBodies;
    robotIntakeBodies;
    robtob;

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
        this.load.image('linearslide', '/linearSlide.png');
    }

    create() {
        this.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION, 'sky').setScale(2 * this.FIELD_DIMENSION / 2270, 2 * this.FIELD_DIMENSION / 2270).setAlpha(0.5);
        this.matter.world.setGravity(0, 0);
        this.matter.world.setBounds(0, 0, GameDimensions[0], GameDimensions[1]);
        /*
        this.robots = [
            new Bobot(0, this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 12, 12, "BLUE"),
            new Bobot(0, this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 12, 12, "RED"),
            new Bobot(0, 3 * this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 12, 12, "BLUE"),
            new Bobot(0, 3 * this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 12, 12, "RED")
        ];

        const redParticles = this.add.particles('red');
        const blueParticles = this.add.particles('blue');
        */

        // const logo = this.physics.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION / 3, 'logo').setScale(0.5, 0.5);

        // let logoScl = 2;
        // let junctionScale = 0.1;
        // this.junctionBodies = this.physics.add.staticGroup();
        // this.robotBodies = this.physics.add.group();
        // this.robotIntakeBodies = this.physics.add.group();
        // this.junctionBodies.enableBody = true;
        // this.physics.add.staticGroup();

        /*
        logo.setVelocity(100 * logoScl, 200 * logoScl);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        */

        /*
        this.junctions.forEach(junction => {
            junction.x += this.FIELD_DIMENSION;
            junction.y += this.FIELD_DIMENSION;
            let phaserObject = this.junctionBodies.create(junction.x, junction.y, 'junction').setScale(junctionScale).refreshBody();
            phaserObject.body.setCircle(9.6);
            junction.setPhaserObject(phaserObject);
        });

        this.robots.forEach(robot => {
            const emitter = (robot.alliance == 'BLUE' ? redParticles : blueParticles).createEmitter({
                speed: 50,
                scale: { start: 0.5, end: 0 },
                blendMode: 'ADD',
            });
            robot.width *= this.FIELD_DIMENSION / 6 / 12;
            robot.height *= this.FIELD_DIMENSION / 6 / 12;
            let slideObject = this.robotIntakeBodies.create(robot.x, robot.y, 'linearslide').setScale(this.FIELD_DIMENSION / 12 * 3 / 1920, this.FIELD_DIMENSION / 12 * 3 / 1920);
            let phaserObject = this.robotBodies.create(robot.x, robot.y, robot.alliance == 'RED' ? 'redlight' : 'bluelight').setScale(robot.width / 192, robot.height / 192).refreshBody(); // this.add.rectangle(robot.x, robot.y, robot.width, robot.height, robot.alliance == "RED" ? 0xFF0000 : 0x0000FF, 0.5);
            phaserObject.setBounce(0.1);
            phaserObject.setCollideWorldBounds(true);
            phaserObject.setDrag(robot.friction, robot.friction);
            phaserObject.setFriction(robot.friction / 2, robot.friction / 2);
            phaserObject.setMaxVelocity(robot.speedCap, robot.speedCap);
            phaserObject.setMass(robot.mass);
            phaserObject.setAngularDrag(robot.friction);
            robot.setPhaserObject(phaserObject);
            robot.slideObject = slideObject;
            emitter.startFollow(robot.phaserObject);
        });
        this.physics.add.collider(this.robotBodies, this.junctionBodies);
        this.physics.add.collider(this.robotBodies, this.robotBodies);
        this.physics.add.collider(this.robtob.slide, this.junctionBodies, () => console.log("colliin sloidge"));
        this.physics.add.collider(this.junctionBodies, this.robtob.chassis, () => console.log("colliin robtob"));
        */
        // this.physics.add.collider(this.robotBodies, this.junctionBodies, () => console.log("collided into a junction!"), () => true);

        // logo.setDepth(1);
        this.robtob = new Robot(0, this, 'RED');
    }

    update(time, delta) {
        let cursors = this.input.keyboard.createCursorKeys();
        let robtob = this.robtob;
        // robtob.chassis.setAcceleration(0, 0);
        // robtob.chassis.setAngularAcceleration(0);
        if (cursors.left.isDown) robtob.chassis.applyForce(new Phaser.Math.Vector2(-1, 0));
        if (cursors.right.isDown) robtob.chassis.applyForce(new Phaser.Math.Vector2(1, 0));
        if (cursors.down.isDown) robtob.chassis.applyForce(new Phaser.Math.Vector2(0, 1));
        if (cursors.up.isDown) robtob.chassis.applyForce(new Phaser.Math.Vector2(0, -1));
        /*
        if (cursors.right.isDown) robtob.chassis.setAccelerationX(this.robots[0].acc);
        if (cursors.down.isDown) robtob.chassis.setAccelerationY(this.robots[0].acc);
        if (cursors.up.isDown) robtob.chassis.setAccelerationY(-this.robots[0].acc);
        if (cursors.space.isDown) robtob.chassis.setAngularAcceleration(this.robots[0].acc / 2);
        if (cursors.shift.isDown) robtob.slideTargetPos = robtob.slideWidth / 2;
        */
        else robtob.slideTargetPos = 0;
        this.robtob.update();
        for (let i = 0; i < this.junctions.length; i++) this.junctions[i].update(time, delta);
        // for (let i = 0; i < this.robots.length; i++) this.robots[i].update(time, delta);
    }
}

export var GameDimensions = [600, 600];