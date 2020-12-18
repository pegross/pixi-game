import * as PIXI from 'pixi.js';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Game from './Game';

export default class Player extends Sprite
{

    constructor(startTileX: number, startTileY: number, type: string)
    {
        super(Game.get().texture(type, 'right-1'));
        this.x = startTileX * Game.tileSize;
        this.y = startTileY * Game.tileSize;
        this.anchor = new Point(0.5, 0.5);
    }

}
