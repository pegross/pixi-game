import 'phaser';
import Sprite = Phaser.GameObjects.Sprite;
import GameMap from './GameMap';

type DirectionX = 'right' | 'left';
type DirectionY = 'up' | 'down';

export default abstract class Entity
{
    protected texture: string;
    protected frame: string;
    protected sprite?: Sprite;

    protected map: GameMap;
    protected x: number;
    protected y: number;

    protected directionX: DirectionX = 'right';
    protected directionY: DirectionY = 'down';

    protected constructor(texture: string, frame: string, map: GameMap, x: number, y: number)
    {
        this.texture = texture;
        this.frame = frame;

        this.map = map;
        this.x = x;
        this.y = y;
    }

    render()
    {
        const pixelX = this.x * GameMap.TILE_SIZE;
        const pixelY = this.y * GameMap.TILE_SIZE;

        if (!this.sprite) {
            this.sprite = this.map.scene.add.sprite(pixelX, pixelY, this.texture, this.frame);
            this.sprite.setScale(2);
            this.registerSpriteAnimations();
        } else {
            this.map.scene.tweens.add({
                targets: this.sprite,
                x: pixelX,
                y: pixelY,
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

    }

    protected registerSpriteAnimations()
    {

    }

    protected playAnimation(animation: string)
    {
        if (!this.sprite) {
            return;
        }

        this.sprite.anims.play(animation);
    }

    moveDown()
    {
        this.directionY = 'down';
        this.move(this.x, this.y + 1);
    }

    moveLeft()
    {
        this.directionX = 'left';
        this.move(this.x - 1, this.y);
    }

    moveRight()
    {
        this.directionX = 'right';
        this.move(this.x + 1, this.y);
    }

    moveUp()
    {
        this.directionY = 'up';
        this.move(this.x, this.y - 1);
    }

    protected moveAllowed(x: number, y: number): boolean
    {
        return (this.map.getTile(x, y) !== null);
    }

    protected move(x: number, y: number)
    {
        if (!this.moveAllowed(x, y)) {
            return;
        }

        this.x = x;
        this.y = y;
    }
}
