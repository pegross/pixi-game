import 'phaser';
import Tile from './Tile';
import { GameScene } from './GameScene';
import { sprintf } from 'sprintf-js';

export default class World
{
    static TILE_SIZE: number = 64;

    renderScene: GameScene;

    private readonly tiles: Tile[][] = [];
    constructor(width: number, height: number, scene: GameScene)
    {
        this.renderScene = scene;

        const tiles: Tile[][] = [];
        for (let x = 0; x < width; x++) {
            tiles[x] = [];

            for (let y = 0; y < height; y++) {
                tiles[x][y] = new Tile('grass-medium', this, x, y);
            }
        }

        this.tiles = tiles;
    }

    getTiles(): Tile[][]
    {
        return this.tiles;
    }

    getTilesFlat(): Tile[]
    {
        return this.tiles.flat(1);
    }

    getTile(x: number, y: number): Tile
    {
        if (!this.tiles[x]) {
            throw new Error(sprintf('Invalid x coordinate in %d,%d', x, y));
        }

        if (!this.tiles[x][y]) {
            throw new Error(sprintf('Invalid y coordinate in %d,%d', x, y));
        }

        return this.tiles[x][y];
    }

}
