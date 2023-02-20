import Phaser from 'phaser'

import HomeScreen from './HomeScreen'

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
    },
    scene: [HomeScreen],
}

export var GameDimensions = [config.width, config.height];
export default new Phaser.Game(config)