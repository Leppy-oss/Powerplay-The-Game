import Phaser from 'phaser';
import Junction from './obj/Junction';
import Robot from './obj/Robot'
import { JunctionType } from './obj/JunctionType';

export default class HomeScreen extends Phaser.Scene {
    FIELD_DIMENSION = 400;
    cursors;
    junctionBodies;

    junctions = [
        //y value -this.FIELD_DIMENSION * 2.0/3.0
            new Junction(0, -this.FIELD_DIMENSION * 2.0/3.0, -this.FIELD_DIMENSION * 2.0/3.0, JunctionType.GROUND),
            new Junction(0, -this.FIELD_DIMENSION/3, -this.FIELD_DIMENSION * 2.0/3.0, JunctionType.LOW),
            new Junction(0, 0.0, -this.FIELD_DIMENSION * 2.0/3.0, JunctionType.GROUND),
            new Junction(0, this.FIELD_DIMENSION/3.0, -this.FIELD_DIMENSION * 2.0/3.0, JunctionType.LOW),
            new Junction(0, this.FIELD_DIMENSION * 2.0/3.0, -this.FIELD_DIMENSION * 2.0/3.0, JunctionType.GROUND),
        //y value -this.FIELD_DIMENSION/3.0
            new Junction(0, -this.FIELD_DIMENSION * 2.0/3.0, -this.FIELD_DIMENSION/3.0, JunctionType.LOW),
            new Junction(0, -this.FIELD_DIMENSION/3, -this.FIELD_DIMENSION/3.0, JunctionType.MID),
            new Junction(0, 0.0, -this.FIELD_DIMENSION/3.0, JunctionType.HIGH),
            new Junction(0, this.FIELD_DIMENSION/3.0, -this.FIELD_DIMENSION/3.0, JunctionType.MID),
            new Junction(0, this.FIELD_DIMENSION * 2.0/3.0, -this.FIELD_DIMENSION/3.0, JunctionType.LOW),
        //y value 0.0
            new Junction(0, -this.FIELD_DIMENSION * 2.0/3.0, 0.0, JunctionType.GROUND),
            new Junction(0, -this.FIELD_DIMENSION/3, 0.0, JunctionType.HIGH),
            new Junction(0, 0.0, 0.0, JunctionType.GROUND),
            new Junction(0, this.FIELD_DIMENSION/3.0, 0.0, JunctionType.HIGH),
            new Junction(0, this.FIELD_DIMENSION * 2.0/3.0, 0.0, JunctionType.GROUND),
        //y value this.FIELD_DIMENSION/3.0
            new Junction(0, -this.FIELD_DIMENSION * 2.0/3.0, this.FIELD_DIMENSION/3.0, JunctionType.LOW),
            new Junction(0, -this.FIELD_DIMENSION/3, this.FIELD_DIMENSION/3.0, JunctionType.MID),
            new Junction(0, 0.0, this.FIELD_DIMENSION/3.0, JunctionType.HIGH),
            new Junction(0, this.FIELD_DIMENSION/3.0, this.FIELD_DIMENSION/3.0, JunctionType.MID),
            new Junction(0, this.FIELD_DIMENSION * 2.0/3.0, this.FIELD_DIMENSION/3.0, JunctionType.LOW),
        //y value this.FIELD_DIMENSION * 2.0/3.0
            new Junction(0, -this.FIELD_DIMENSION * 2.0/3.0, this.FIELD_DIMENSION * 2.0/3.0, JunctionType.GROUND),
            new Junction(0, -this.FIELD_DIMENSION/3, this.FIELD_DIMENSION * 2.0/3.0, JunctionType.LOW),
            new Junction(0, 0.0, this.FIELD_DIMENSION * 2.0/3.0, JunctionType.GROUND),
            new Junction(0, this.FIELD_DIMENSION/3.0, this.FIELD_DIMENSION * 2.0/3.0, JunctionType.LOW),
            new Junction(0, this.FIELD_DIMENSION * 2.0/3.0, this.FIELD_DIMENSION * 2.0/3.0, JunctionType.GROUND)
    ];

    robots = [
        new Robot(0, this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 14, 14, "BLUE"),
        new Robot(0, this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 14, 14, "RED"),
        new Robot(0, 3 * this.FIELD_DIMENSION / 2, this.FIELD_DIMENSION / 6, 14, 14, "BLUE"),
        new Robot(0, 3 * this.FIELD_DIMENSION / 2, 11 * this.FIELD_DIMENSION / 6, 14, 14, "RED"),
    ]

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
        this.add.image(this.FIELD_DIMENSION, this.FIELD_DIMENSION, 'sky').setScale(2 * this.FIELD_DIMENSION / 2270, 2 * this.FIELD_DIMENSION / 2270).setAlpha(0.5);

        const particles = this.add.particles('red');

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        });

        const logo = this.physics.add.image(400, 100, 'logo').setScale(0.75, 0.75);
        this.cursors = this.game.input.defaultCursor;

        let logoScl = 2;
        let junctionScale = 0.1;

        logo.setVelocity(100 * logoScl, 200 * logoScl);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        this.junctions.forEach(junction => {
            junction.x += this.FIELD_DIMENSION / 1;
            junction.y += this.FIELD_DIMENSION / 1;
            junction.setPhaserObject(this.physics.add.image(junction.x, junction.y, 'junction').setScale(junctionScale));
            console.log("Created a new junction at (" + Math.round(junction.x) + ", " + Math.round(junction.y) + ") with type " + junction.type[2] + " and " + junction.cones + " cones.");
        });
        this.junctionBodies = this.physics.add.staticGroup();
        this.junctionBodies.enableBody = true;
        this.physics.add.staticGroup()

        this.robots.forEach(robot => {
            robot.width *= 800/6/24;
            robot.height *= 800/6/24;
            robot.setPhaserObject(this.add.rectangle(robot.x, robot.y, robot.width, robot.height, robot.alliance == "RED" ? 0xFF0000 : 0x0000FF, 0.5));
        });

        logo.setDepth(1);

        emitter.startFollow(logo);
    }

    update(time, delta) {
        for (let i = 0; i < this.junctions.length; i++) {
            this.junctions[i].update(time, delta);
        }

        let player = this.robots[0].phaserObject;

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;

            player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
        }
}