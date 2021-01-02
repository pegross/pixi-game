import 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;
import { GameScene } from './lib/GameScene';
import { WelcomeScene } from './lib/WelcomeScene';
import { ScoreScene } from './lib/ScoreScene';

const config: GameConfig = {
    title: 'Starfall',
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

window.onload = () => {
    const game = new StarfallGame(config);
};

export class StarfallGame extends Phaser.Game
{
    constructor(gameConfig: GameConfig) {
        super(gameConfig);
    }
}

