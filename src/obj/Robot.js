import { GameDimensions } from "../HomeScreen";
import { angledTranslation, inchesToGamePixels } from "../utils";

/**
 * @param {Number} index Z-index of the this
 * @param {Phaser.Scene} game The Phaser scene to build everything upon
 * @param {String} alliance Either "RED" or "BLUE" for the alliance of the this
 * @param {Number} acc The constant acceleration to apply to the this
 * @param {Number} friction The static and dynamic friction of the this
 * @param {Number} speedCap Maximum velocity of the this
 * @param {Number} mass Mass of the this; used to calculate matter calculations and collision interactions
 */
export default function Robot(index, game, alliance, cones = 0, x = GameDimensions[0] / 2, y = GameDimensions[1] / 2, width = 14, height = 14, slideWidth = 48, slideHeight = 7, acc = 1000, friction = 0.8, speedCap = 2000, mass = 10000) {
    this.x = x;
    this.y = y;
    this.cones = cones;
    this.y;
    this.game = game;
    this.width = inchesToGamePixels(width);
    this.height = inchesToGamePixels(height);
    this.slideWidth = inchesToGamePixels(slideWidth);
    this.slideHeight = inchesToGamePixels(slideHeight);
    this.alliance = alliance;
    this.acc = acc;
    this.speedCap = speedCap;
    this.mass = mass;
    this.friction = friction;
    this.retractedPos = 10;
    this.slidePos = this.retractedPos;
    this.slideTargetPos = this.retractedPos;
    this.slideCollidingWithSomething = false;
    this.slide = game.matter.add.sprite(this.x, this.y, 'linearslide').setSize(this.slideWidth, this.slideHeight).setDisplaySize(this.slideWidth, this.slideHeight);
    // this.slide.setCollideWorldBounds(true);
    this.chassis = game.matter.add.sprite(this.x, this.y, this.alliance == 'RED' ? 'redlight' : 'bluelight');
    this.slide.setCollisionGroup(1); // robtob
    this.chassis.setCollisionGroup(2); // robtob
    this.slide.setCollidesWith(0); // environment
    this.chassis.setCollidesWith(0); // environment
    this.chassis.setSize(this.width, this.height);
    this.chassis.setDisplaySize(this.width, this.height);
    this.chassis.setMass(this.mass);
    // this.chassis.setFrictionAir(this.friction / 100);
    this.chassis.setFriction(this.friction);
    this.chassis.setFrictionStatic(this.friction);
    // this.chassis.setSize(this.width, this.height);
    // this.chassis.setDisplaySize(this.width, this.height);
    // this.chassis.body.setSize(this.width, this.height);
    /*
    console.log(this.chassis.body.width)
    this.chassis.setCollideWorldBounds(true);
    this.chassis.setBounce(0.1);
    this.chassis.setDrag(this.friction, this.friction);
    this.chassis.setFriction(this.friction / 2, this.friction / 2);
    this.chassis.setMaxVelocity(this.speedCap, this.speedCap);
    this.chassis.setMass(this.mass);
    this.chassis.setAngularDrag(2 * this.friction);
    */

    // game.matter.enable(this.tank, Phaser.matter.Arcade);

    /*
    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();

    game.matter.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
    */
};

Robot.prototype.damage = function() {
    return false;
}

Robot.prototype.update = function() {
    this.slidePos = new Phaser.Math.Vector2(this.slidePos, 0).lerp(new Phaser.Math.Vector2(this.slideTargetPos, 0), 0.05).x;
    // this.slide.rotation = this.chassis.rotation - Math.PI / 2;
    // this.slide.setScale(1, 1);
    // this.slide.setOrigin(0.5, 0.5);
    this.slide.setRotation(this.chassis.rotation - Math.PI / 2);
    this.slide.setSize(this.slidePos / this.slideHeight, this.slidePos * 2);
    this.slide.setDisplaySize(this.slidePos * 2, this.slideHeight);
    // this.slide.setDisplaySize(this.slideTargetPos, this.slideHeight);
    // this.slide.setSize(this.slidePos * 2, this.slideHeight);
    // this.slide.setBodySize(this.slide.width, this.slide.height);
    // this.slide.setAngularVelocity(this.slidePos - 10);
    // this.slide.setRotation(this.chassis.rotation - Math.PI / 2);
    this.chassis.setScale(0.3, 0.3);
    let tempCoords = angledTranslation(this.slidePos, this.chassis.x, this.chassis.y, this.slide.rotation);
    this.slide.x = tempCoords[0];
    this.slide.y = tempCoords[1];
};

/*
Robot.prototype.update = function() {
    this.slidePos = new Phaser.Math.Vector2(this.slidePos, 0).lerp(new Phaser.Math.Vector2(this.slideTargetPos, 0), 0.05).x;
    this.slide.setScale(1, 1);
    this.slide.setOrigin(0.5, 0.5);
    // this.slide.setSize(this.slidePos * 2, this.slideHeight);
    // this.slide.body.setSize(this.slidePos * 2, this.slideHeight, false);
    this.slide.setDisplaySize(this.slidePos * 2, this.slideHeight);
    this.slide.setBodySize(this.slidePos * 2, this.slideHeight);
    this.slide.setScale(1, 1);
    console.log(this.slide.body.width)
    this.chassis.setScale(0.3, 0.3);
    let tempCoords = angledTranslation(this.slidePos, this.chassis.x, this.chassis.y, this.slide.rotation);
    this.slide.x = tempCoords[0];
    this.slide.y = tempCoords[1];
    this.slide.rotation = this.chassis.rotation - Math.PI / 2;
    // console.log(this.slide.body.setSize(this.slidePos * 2, this.slideHeight, false));
    /*
    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;

    this.turret.x = this.tank.x;
    this.turret.y = this.tank.y;
    this.turret.rotation = this.game.matter.arcade.angleBetween(this.tank, this.player);
};
*/

Robot.prototype.setSlideTargetPosition = function(pos) {}