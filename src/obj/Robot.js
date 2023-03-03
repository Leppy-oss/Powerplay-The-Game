import { GameDimensions } from "../HomeScreen";
import { angledTranslation, inchesToGamePixels } from "../utils";

/**
 * @param {Number} index Z-index of the this
 * @param {Phaser.Scene} game The Phaser scene to build everything upon
 * @param {String} alliance Either "RED" or "BLUE" for the alliance of the this
 * @param {Number} acc The constant acceleration to apply to the this
 * @param {Number} friction The static and dynamic friction of the this
 * @param {Number} speedCap Maximum velocity of the this
 * @param {Number} mass Mass of the this; used to calculate physics calculations and collision interactions
 */
export default function Robot (index, game, alliance, cones=0, x=GameDimensions[0]/2, y=GameDimensions[1]/2, width=14, height=14, acc=1000, friction=500, speedCap=200, mass=100) {
    this.x = x;
    this.y = y;
    this.cones = cones;
    this.y;
    this.width = inchesToGamePixels(width);
    this.height = inchesToGamePixels(height);
    this.alliance = alliance;
    this.acc = acc;
    this.speedCap = speedCap;
    this.mass = mass;
    this.friction = friction;
    this.slideExtension = 0;
    this.slide = game.physics.add.sprite(this.x, this.y, 'linearslide').setSize(this.width, this.height / 2).setDisplaySize(this.width, this.height / 2);
    this.chassis = game.physics.add.sprite(this.x, this.y, this.alliance == 'RED' ? 'redlight' : 'bluelight').setSize(this.width, this.height).setDisplaySize(this.width, this.height);
    this.chassis.setCollideWorldBounds(true);
    this.chassis.setBounce(0.1);
    this.chassis.setCollideWorldBounds(true);
    this.chassis.setDrag(this.friction, this.friction);
    this.chassis.setFriction(this.friction / 2, this.friction / 2);
    this.chassis.setMaxVelocity(this.speedCap, this.speedCap);
    this.chassis.setMass(this.mass);
    this.chassis.setAngularDrag(2 * this.friction);

    // game.physics.enable(this.tank, Phaser.Physics.Arcade);

    /*
    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
    */
};

Robot.prototype.damage = function() {
    return false;
}

Robot.prototype.update = function() {
    let tempCoords = angledTranslation(50, this.chassis.x, this.chassis.y, this.slide.rotation);
    this.slide.x = tempCoords[0];
    this.slide.y = tempCoords[1];
    this.slide.rotation = this.chassis.rotation - Math.PI / 2;
    /*
    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;

    this.turret.x = this.tank.x;
    this.turret.y = this.tank.y;
    this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);
    */
};

Robot.prototype.setSlideTargetPosition = function(pos) {
}