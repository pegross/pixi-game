import 'phaser';
import GameMap from './GameMap';
import Creature from './Creature';
import { GameScene } from './GameScene';
import Scene = Phaser.Scene;

type Action = 'moveLeft' | 'moveRight' | 'moveDown' | 'moveUp';
export default class Player extends Creature
{
    action?: Action;

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
        
        switch (this.action) {
            case 'moveDown':
                this.moveDown();
                break;
            case 'moveLeft':
                this.moveLeft();
                break;
            case 'moveRight':
                this.moveRight();
                break;
            case 'moveUp':
                this.moveUp();
                break;
        }

        this.action = undefined;
    }

    protected move(x: number, y: number)
    {
        super.move(x, y);

        if (this.sprite) {
            if(this.directionY === 'up') {
                this.sprite.anims.play('moveBack');
            } else {
                this.sprite.anims.play('move');
            }
        }
    }

    protected registerSpriteAnimations()
    {
        if (!this.sprite) {
            throw new Error('Sprite is undefined');
        }

        const framesFront = this.sprite.anims.generateFrameNames('hunter', {
            prefix: 'left_',
            start: 1,
            end: 3,
            zeroPad: 2
        });
        framesFront.push(framesFront[0]);

        this.sprite.anims.create({
            key: 'move',
            frames: framesFront,
            duration: 250,
        });

        const framesBack = this.sprite.anims.generateFrameNames('hunter', {
            prefix: 'back_left_',
            start: 1,
            end: 3,
            zeroPad: 2
        });
        framesBack.push(framesBack[0]);

        this.sprite.anims.create({
            key: 'moveBack',
            frames: framesBack,
            duration: 250,
        });
    }

    setAction(action: Action)
    {
        this.action = action;
    }

    listenScene(scene: Scene)
    {
        const listen = (action: Action) => {
            this.setAction(action);
            console.log(action);
        };

        scene.input.keyboard.on('keydown-W', () => {
            listen('moveUp');
        });

        scene.input.keyboard.on('keydown-A', () => {
            listen('moveLeft');
        });

        scene.input.keyboard.on('keydown-S', () => {
            listen('moveDown');
        });

        scene.input.keyboard.on('keydown-D', () => {
            listen('moveRight');
        });

    }
}

