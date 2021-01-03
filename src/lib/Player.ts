import 'phaser';
import GameMap from './GameMap';
import Creature, { Action, ActionDirection, ActionType } from './Creature';
import { GameScene } from './GameScene';
import Scene = Phaser.Scene;

export default class Player extends Creature
{

    constructor(map: GameMap, x: number, y: number)
    {
        super('hunter', 'right_01', map, x, y);
    }

    doAction()
    {
        if (this.sprite) {
            if (this.sprite.anims.isPlaying) {
                this.action = undefined;
                return;
            }
        }

        super.doAction();
    }

    listenScene(scene: Scene)
    {
        const listen = (action: Action) => {
            this.setAction(action);
            this.map.scene.nextTurn();
            console.log(action);
        };

        scene.input.keyboard.on('keydown-W', () => {
            listen({ type: 'move', direction: 'up' });
        });

        scene.input.keyboard.on('keydown-A', () => {
            listen({ type: 'move', direction: 'left' });
        });

        scene.input.keyboard.on('keydown-S', () => {
            listen({ type: 'move', direction: 'down' });
        });

        scene.input.keyboard.on('keydown-D', () => {
            listen({ type: 'move', direction: 'right' });
        });

    }

}

