import 'phaser';
import Tile from './Tile';

export default class GameMap
{
    static TILE_SIZE: number = 64;

    scene: Phaser.Scene;
    private readonly tiles: Tile[][] = [];

    constructor(width: number, height: number, scene: Phaser.Scene)
    {
        this.scene = scene;

        const tiles: Tile[][] = [];
        for (let x = 0; x < width; x++) {
            tiles[x] = [];

            for (let y = 0; y < height; y++) {
                tiles[x][y] = new Tile('grass-medium', this, x, y);
            }
        }

        this.tiles = tiles;
    }

    getTiles(): Tile[]
    {
        return this.tiles.flat(1);
    }

    getTile(x: number, y: number): Tile | null
    {
        if (!this.tiles[x]) {
            return null;
        }
        if (!this.tiles[x][y]) {
            return null;
        }

        return this.tiles[x][y];
    }

}
