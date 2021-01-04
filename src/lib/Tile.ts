import 'phaser';
import Creature from './Creature';
import Sprite = Phaser.GameObjects.Sprite;
import World from './World';

export default class Tile
{

    protected texture: string;
    protected frame: string;
    protected sprite?: Sprite;

    protected world: World;
    protected x: number;
    protected y: number;

    private creature?: Creature;

    constructor(frame: string, world: World, x: number, y: number)
    {
        this.texture = 'tiles';
        this.frame = frame;

        this.world = world;
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getCreature() {
        return this.creature;
    }

    creatureEnter(creature: Creature)
    {
        // TODO: apply evil enter effects
        if (!this.creature) {
            this.creature = creature;
        }
    }

    creatureLeave(creature: Creature) {
        // TODO: apply evil leave effects
        this.removeCreature();
    }

    removeCreature() {
        this.creature = undefined;
    }

    creatureCanEnter(): boolean
    {
        return !this.creature;
    }

    render()
    {
        const pixelX = this.x * World.TILE_SIZE + 0.5 * World.TILE_SIZE;
        const pixelY = this.y * World.TILE_SIZE + 0.5 * World.TILE_SIZE;

        if (!this.sprite) {
            this.sprite = this.world.renderScene.add.sprite(pixelX, pixelY, this.texture, this.frame);
            this.sprite.setScale(2);
        } else {
            this.world.renderScene.tweens.add({
                targets: this.sprite,
                x: pixelX,
                y: pixelY,
                ease: 'InOut',
                duration: 100,
            });
        }

    }

    right(): Tile | null
    {
        return this.world.getTile(this.x + 1, this.y);
    }

    left(): Tile | null
    {
        return this.world.getTile(this.x - 1, this.y);
    }

    down(): Tile | null
    {
        return this.world.getTile(this.x, this.y + 1);
    }

    up(): Tile | null
    {
        return this.world.getTile(this.x, this.y - 1);
    }
}
