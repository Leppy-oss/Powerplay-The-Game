import Phaser from 'phaser'

import HomeScreen from './HomeScreen'

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 200 },
        },
    },
    scene: [HomeScreen],
}

export var GameDimensions = [config.width, config.height];
export default new Phaser.Game(config)