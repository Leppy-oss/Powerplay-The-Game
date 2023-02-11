import Phaser from 'phaser'

import HomeScreen from './HomeScreen'

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [HomeScreen],
}

export default new Phaser.Game(config)