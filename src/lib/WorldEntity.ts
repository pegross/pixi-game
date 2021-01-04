import 'phaser';
import Sprite = Phaser.GameObjects.Sprite;
import World from './World';
import Tile from './Tile';

type DirectionX = 'right' | 'left';
type DirectionY = 'up' | 'down';

export default abstract class WorldEntity
{
    currentTile: Tile;

    protected texture: string;
    protected frame: string;

    protected sprite?: Sprite;
    protected world: World;

    protected directionX: DirectionX = 'right';
    protected directionY: DirectionY = 'down';

    protected currentRenderX = 0;
    protected currentRenderY = 0;

    protected constructor(texture: string, frame: string, world: World)
    {
        this.texture = texture;
        this.frame = frame;
        this.world = world;
        this.currentTile = world.getTile(0, 0);
    }

    getCurrentRenderX() {
        return this.currentRenderX;
    }

    getCurrentRenderY() {
        return this.currentRenderY;
    }

    getWorld() {
        return this.world;
    }

    setPosition(x: number, y: number) {
        const targetTile = this.world.getTile(x, y);

        if(targetTile.getCreature()) {
            throw new Error('Target tile is blocked');
        }

        this.currentTile = targetTile;
    }

    render()
    {
        this.currentRenderX = this.currentTile.getX() * World.TILE_SIZE + 0.5 * World.TILE_SIZE;
        this.currentRenderY = this.currentTile.getY() * World.TILE_SIZE + 0.5 * World.TILE_SIZE;
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

}
