import 'phaser';
import WorldEntity from './WorldEntity';
import World from './World';
import Tile from './Tile';
import HealthBar from './HealthBar';

export type ActionDirection = 'up' | 'down' | 'left' | 'right';
export type ActionType = 'move' | 'attack' | 'idle';
export type Action = { type: ActionType, direction: ActionDirection }

export default class Creature extends WorldEntity
{

    isDead = false;
    maxHealth = 10;
    health = this.maxHealth;
    private strength = 6;
    private healthBar: HealthBar;

    action?: Action;

    constructor(texture: string, frame: string, world: World)
    {
        super(texture, frame, world);
        this.healthBar = new HealthBar(this);
    }

    render()
    {
        if (this.isDead) {
            return;
        }

        super.render();

        if (!this.sprite) {
            this.sprite = this.world.renderScene.add.sprite(this.currentRenderX, this.currentRenderY, this.texture, this.frame);
            this.sprite.setScale(2);
            this.registerSpriteAnimations();
        } else {
            this.world.renderScene.tweens.add({
                targets: [this.sprite, this.healthBar],
                x: this.currentRenderX,
                y: this.currentRenderY,
                ease: 'InOut',
                duration: 100,
            });
        }

        if (this.directionX === 'left') {
            this.sprite.flipX = false;
        }

        if (this.directionX === 'right') {
            this.sprite.flipX = true;
        }

        this.healthBar.render();
    }

    attack(target: Creature)
    {
        target.takeDamage(this.strength);
    }

    die()
    {
        this.isDead = true;

        this.currentTile.removeCreature();

        if (this.sprite) {
            this.sprite.destroy();
        }

        this.healthBar.remove();
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
        const types: ActionType[] = ['move', 'idle'];
        const directions: ActionDirection[] = ['up', 'down', 'left', 'right'];

        this.setAction({
            type: types[Math.floor(Math.random() * types.length)],
            direction: directions[Math.floor(Math.random() * directions.length)],
        });
    }

    private setHealth(health: number): void
    {
        this.health = health;

        if (this.health <= 0) {
            this.die();
        }
    }

    setAction(action: Action)
    {
        this.action = action;
    }


    doAction()
    {
        if (this.isDead) {
            return;
        }

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
            case 'idle':
                this.idle();
                return;
        }

        this.action = undefined;
    }

    protected idle(): void
    {
    }

    protected enterTile(targetTile: Tile)
    {
        if (!targetTile.creatureCanEnter()) {
            throw new Error('Entering tile not allowed');
        }

        this.currentTile.creatureLeave(this);
        this.currentTile = targetTile;
        targetTile.creatureEnter(this);
    }

    moveDown()
    {
        this.directionY = 'down';
        this.move(this.currentTile.getX(), this.currentTile.getY() + 1);
    }

    moveLeft()
    {
        this.directionX = 'left';
        this.move(this.currentTile.getX() - 1, this.currentTile.getY());
    }

    moveRight()
    {
        this.directionX = 'right';
        this.move(this.currentTile.getX() + 1, this.currentTile.getY());
    }

    moveUp()
    {
        this.directionY = 'up';
        this.move(this.currentTile.getX(), this.currentTile.getY() - 1);
    }

    protected move(x: number, y: number)
    {
        let targetTile;
        try {
            targetTile = this.world.getTile(x, y);
        } catch {
            return;
        }

        console.log(targetTile);

        const creature = targetTile.getCreature();
        if (creature) {
            this.attack(creature);
            return;
        }

        this.enterTile(targetTile);

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
