import Phaser from 'phaser'

export default class HomeScreen extends Phaser.Scene {
    constructor() {
        super('hello-world')
    }

    preload() {
        this.load.image('logo', '/8565CL.png')

        this.load.image('sky', 'chassisbg.jpg')
        this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png')
    }

    create() {
        this.add.image(400, 300, 'sky').setScale(0.4, 0.4).setAlpha(0.2);

        const particles = this.add.particles('red')

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        })

        const logo = this.physics.add.image(400, 100, 'logo').setScale(0.75, 0.75);

        let scl = 2;

        logo.setVelocity(100 * scl, 200 * scl)
        logo.setBounce(1, 1)
        logo.setCollideWorldBounds(true)

        emitter.startFollow(logo)
    }
}