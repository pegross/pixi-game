import * as PIXI from 'pixi.js';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Game from './Game';

export default class Creature extends Sprite
{

    constructor(startTileX: number, startTileY: number, animationSheet: string)
    {
        super(Game.get().texture(animationSheet, 'right-1'));
        this.x = startTileX * Game.tileSize;
        this.y = startTileY * Game.tileSize;
        this.anchor = new Point(0.5, 0.5);
    }

    setTile(x: number, y: number): void
    {
        this.x = x * Game.tileSize;
        this.y = y * Game.tileSize;
    }
}
