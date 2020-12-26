import * as PIXI from 'pixi.js';
import Game from './Game';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Player from './Player';

export default class World extends PIXI.Container
{

    widthTiles: number;
    heightTiles: number;

    startTile: Point;

    constructor(widthInTiles: number, heightInTiles: number)
    {
        super();

        this.startTile = new Point(2, 2);
        this.widthTiles = widthInTiles;
        this.heightTiles = heightInTiles;

        const texture = Game.get().texture('tiles', 'grass-dark-1');

        for (let x = 0; x < this.heightTiles; x++) {
            for (let y = 0; y < this.widthTiles; y++) {
                const sprite = new Sprite(texture);
                sprite.x = x * Game.tileSize;
                sprite.y = y * Game.tileSize;
                sprite.anchor = new Point(0.5, 0.5);
                sprite.interactive = true;

                sprite.on('mouseover', () => {
                    console.log({ 'x': x, 'y': y });
                    sprite.alpha = 0.9;
                });

                sprite.on('mouseout', () => {
                    sprite.alpha = 1.0
                });

                this.addChild(sprite);
            }
        }
    }

}
