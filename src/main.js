import Phaser from 'phaser'

import HomeScreen from './HomeScreen'
import { GameDimensions } from './HomeScreen';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: GameDimensions[0],
    height: GameDimensions[1],
    physics: {
        default: 'arcade',
    },
    scene: [HomeScreen],
}

export default new Phaser.Game(config)