import 'phaser';
import Entity from './Entity';
import GameMap from './GameMap';

export type ActionDirection = 'up' | 'down' | 'left' | 'right';
export type ActionType = 'move' | 'attack' | 'none';
export type Action = { type: ActionType, direction: ActionDirection }

export default class Creature extends Entity
{

    private maxHealth = 10;
    private health = this.maxHealth;
    private strength = 6;
    private isDead = false;

    action?: Action;

    constructor(texture: string, frame: string, map: GameMap, x: number, y: number)
    {
        super(texture, frame, map, x, y);

        if (!this.sprite) {
            return;
        }

    }

    attack(target: Creature)
    {
        target.takeDamage(this.strength);
    }

    onDeath()
    {
        if (this.sprite) {
            this.sprite.destroy();
        }
    }

    moveDirection()
    {

    }

    takeDamage(damage: number)
    {
        this.modifyHealth(-Math.abs(damage));
    }

    modifyHealth(change: number): void
    {
        this.setHealth(this.health + change);
    }

    setRandomAction()
    {
        const types: ActionType[] = ['move', 'none'];
        const directions: ActionDirection[] = ['up', 'down', 'left', 'right'];

        this.setAction({
            type: types[Math.floor(Math.random() * types.length)],
            direction: directions[Math.floor(Math.random() * directions.length)],
        });
    }

    private setHealth(health: number): void
    {
        this.health = health;
        if (this.isDead) {
            this.onDeath();
        }
    }

    setAction(action: Action)
    {
        this.action = action;
    }


    doAction()
    {
        if (!this.action) {
            return;
        }

        switch (this.action.type) {
            case 'move':
                switch (this.action.direction) {
                    case 'down':
                        this.moveDown();
                        break;
                    case 'left':
                        this.moveLeft();
                        break;
                    case 'right':
                        this.moveRight();
                        break;
                    case 'up':
                        this.moveUp();
                }
                break;
            case 'attack':
                return;
            case 'none':
                return;
        }

        this.action = undefined;
    }

    protected move(x: number, y: number)
    {
        super.move(x, y);

        if (this.sprite) {
            if (this.directionY === 'up') {
                this.sprite.anims.play('moveBack');
            } else {
                this.sprite.anims.play('move');
            }
        }
    }

    protected registerSpriteAnimations(hasBackAnimation = false)
    {
        if (!this.sprite) {
            throw new Error('Sprite is undefined');
        }

        const framesFront = this.sprite.anims.generateFrameNames(this.texture, {
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

        let framesBack = framesFront;
        if (hasBackAnimation) {
            framesBack = this.sprite.anims.generateFrameNames(this.texture, {
                prefix: 'back_left_',
                start: 1,
                end: 3,
                zeroPad: 2
            });
            framesBack.push(framesBack[0]);
        }

        this.sprite.anims.create({
            key: 'moveBack',
            frames: framesBack,
            duration: 250,
        });
    }
}
