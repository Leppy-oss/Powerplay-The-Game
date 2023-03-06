import { CATEGORY_ENV, CATEGORY_ROBOT_1, GameDimensions } from "../HomeScreen";
import { angledTranslation, inchesToGamePixels } from "../utils";
const Vector2 = Phaser.Math.Vector2;

/**
 * @param {Number} index Z-index of the this
 * @param {Phaser.Scene} game The Phaser scene to build everything upon
 * @param {String} alliance Either "RED" or "BLUE" for the alliance of the this
 * @param {Number} acc The constant acceleration to apply to the this
 * @param {Number} friction The static and dynamic friction of the this
 * @param {Number} speedCap Maximum velocity of the this
 * @param {Number} mass Mass of the this; used to calculate matter calculations and collision interactions
 */
export default function Robot(index, game, alliance, cones = 0, x = GameDimensions[0] / 2, y = GameDimensions[1] / 2, width = 14, height = 14, slideWidth = 48, slideHeight = 7, acc = 1000, friction = 0.8, speedCap = 2000, mass = 200) {
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
    this.slide = this.game.add.image(this.x, this.y + 200, 'linearslide').setSize(this.slideWidth, this.slideHeight).setDisplaySize(this.slideWidth, this.slideHeight);
    // this.slide.setCollideWorldBounds(true);
    this.chassis = this.game.matter.add.sprite(this.x, this.y, this.alliance == 'RED' ? 'redlight' : 'bluelight');
    /*
    let walls = this.game.matter.add.rectangle(200, 200, 200, 200);
    walls.isStatic = false;
    walls.mass = 10000;
    walls.collisionFilter.category = CATEGORY_ENV;
    */
    // this.chassis.setCollisionCategory(CATEGORY_ROBOT_1); // robtob
    // this.chassis.setCollidesWith([CATEGORY_ENV]); // environment

    this.chassis.setDisplaySize(this.width, this.height);
    this.chassis.setMass(this.mass);
    this.chassis.setFrictionAir(this.friction / 10);
    this.chassis.setFriction(this.friction);
    this.chassis.setFrictionStatic(this.friction);

    var rectA = this.game.matter.add.rectangle(300, 300, 200, 24);
    var rectB = this.game.matter.add.rectangle(300, 300, 24, 200);
    var circleA = this.game.matter.add.circle(200, 300, 24);
    var circleB = this.game.matter.add.circle(400, 300, 24);
    var circleC = this.game.matter.add.circle(300, 200, 24);
    var circleD = this.game.matter.add.circle(300, 400, 24);

    var bodyFactory = this.game.matter.body;

    this.compoundBody = bodyFactory.create({
        parts: [ rectA, rectB, circleA, circleB, circleC, circleD ]
    });
    this.game.matter.world.remove([rectA, rectB, circleA, circleB, circleC, circleD]);
    // this.compoundBody.mass = 1000;

    // this.compoundBody.collisionFilter.category = CATEGORY_ENV;
    // this.compoundBody.collisionFilter.mask = CATEGORY_ROBOT_1;

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
    var prevRot = this.chassis.rotation;
    var chassisBody = this.game.matter.add.rectangle(this.chassis.x, this.chassis.y, this.width, this.height, { angle: prevRot });
    let tempCoords = angledTranslation(this.slidePos, this.chassis.x, this.chassis.y, prevRot - Math.PI / 2);
    var slideBody = this.game.matter.add.rectangle(tempCoords[0], tempCoords[1], this.slidePos * 2, this.slideHeight, { angle: prevRot - Math.PI / 2});
    slideBody.position.x = this.chassis.x;
    slideBody.position.y = this.chassis.y;
    /*
    var rectA = this.game.matter.add.rectangle(this.chassis.x, this.chassis.y, 200, 24, {angle: prevRot});
    var rectB = this.game.matter.add.rectangle(this.chassis.x, this.chassis.y, 24, 200, {angle: prevRot});
    var circleA = this.game.matter.add.circle(this.chassis.x - 100, this.chassis.y, 24, {angle: prevRot});
    var circleB = this.game.matter.add.circle(this.chassis.x + 100, this.chassis.y, 24, {angle: prevRot});
    var circleC = this.game.matter.add.circle(this.chassis.x, this.chassis.y - 100, 24, {angle: prevRot});
    var circleD = this.game.matter.add.circle(this.chassis.x, this.chassis.y + 100, 24, {angle: prevRot});
    */

    var bodyFactory = this.game.matter.body;

    let compoundBody = bodyFactory.create({
        parts: [chassisBody, slideBody]
    });
    compoundBody.position = { x: this.chassis.x, y: this.chassis.y };
    compoundBody.angle = prevRot;
    this.game.matter.world.remove([chassisBody, slideBody]);

    this.chassis.setExistingBody(compoundBody);
    this.chassis.setOrigin(0.5, 0.5);
    this.chassis.setMass(this.mass);

    this.slide.setDisplaySize(this.slidePos * 2, this.slideHeight); // true argument updates the body size
    this.slide.setRotation(this.chassis.rotation - Math.PI / 2);
    this.slide.setPosition(tempCoords[0], tempCoords[1]);
};

Robot.prototype.setSlideTargetPosition = function(pos) {}