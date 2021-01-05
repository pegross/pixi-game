import 'phaser';
import Creature, { Action, ActionDirection, ActionType } from './Creature';
import Scene = Phaser.Scene;
import World from './World';

export default class Player extends Creature
{

    constructor(world: World)
    {
        super('hunter', 'right_01', world);
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

    render()
    {
        super.render();
        if (this.sprite) {
            this.world.renderScene.cameras.main.startFollow(this.sprite);
        }
    }

    listenScene(scene: Scene)
    {
        const listen = (action: Action) => {
            this.setAction(action);
            this.world.renderScene.nextTurn();
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

