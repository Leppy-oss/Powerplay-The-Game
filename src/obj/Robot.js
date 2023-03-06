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
export default function Robot(index, game, alliance, cones = 0, x = GameDimensions[0] / 2, y = GameDimensions[1] / 2, width = 14, height = 14, slideWidth = 48, slideHeight = 7, acc = 1000, friction = 0.8, speedCap = 2000, mass = 1000) {
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
    this.slide = this.game.matter.add.sprite(this.x, this.y, 'linearslide').setSize(this.slideWidth, this.slideHeight).setDisplaySize(this.slideWidth, this.slideHeight);
    // this.slide.setCollideWorldBounds(true);
    this.chassis = this.game.matter.add.sprite(this.x, this.y, this.alliance == 'RED' ? 'redlight' : 'bluelight');
    let walls = this.game.matter.add.rectangle(0, 0, GameDimensions[0], GameDimensions[1] * 2);
    walls.isStatic = true;
    walls.angularVelocity = 10;
    walls.collisionFilter.group = 1;
    walls.collisionFilter.category = 1;
    walls.collisionFilter.mask = 1;
    this.slide.setCollisionGroup(1); // robtob
    this.slide.setCollisionCategory(0); // robtob
    this.slide.setCollidesWith(1); // environment
    this.slide.setCollisionCategory(0); // robtob
    this.chassis.setCollisionGroup(1); // robtob
    this.chassis.setCollisionCategory(0); // robtob
    this.chassis.setCollidesWith(1); // environment
    // this.chassis.setCollisionCategory(1); // robtob


    this.chassis.setDisplaySize(this.width, this.height);
    this.chassis.setMass(this.mass);
    this.chassis.setFrictionAir(this.friction / 10);
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
};

Robot.prototype.damage = function() {
    return false;
}

Robot.prototype.update = function() {
    this.slidePos = new Phaser.Math.Vector2(this.slidePos, 0).lerp(new Phaser.Math.Vector2(this.slideTargetPos, 0), 0.1).x;
    this.slide.setDisplaySize(this.slidePos * 2, this.slideHeight); // true argument updates the body size
    this.slide.setBody({
        x: this.slide.x,
        y: this.slide.y,
        width: this.slidePos * 2,
        height: this.slideHeight,
        sides: 4,
    });
    this.slide.setRotation(this.chassis.rotation - Math.PI / 2);
    this.slide.setTexture('linearslide');
    let tempCoords = angledTranslation(this.slidePos, this.chassis.x, this.chassis.y, this.slide.rotation);
    this.slide.setPosition(tempCoords[0], tempCoords[1]);
};

Robot.prototype.setSlideTargetPosition = function(pos) {}