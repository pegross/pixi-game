import * as Phaser from 'phaser';
import World from './World';
import { GameScene } from './Scene/GameScene';
import { ScoreScene } from './ScoreScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const config: GameConfig = {
    title: 'Game',
    width: 800,
    height: 600,
    parent: 'game',
    scene: [
        // WelcomeScene,
        GameScene,
        ScoreScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
    backgroundColor: '#18216D',
};

export default class Game extends Phaser.Game
{
    constructor() {
        super(config);
    }
}
