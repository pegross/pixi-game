import 'phaser';
import Entity from './Entity';
import GameMap from './GameMap';

export default class Creature extends Entity
{

    constructor(texture: string, frame: string, map: GameMap, x: number, y: number)
    {
        super(texture, frame, map, x, y);

        if (!this.sprite) {
            return;
        }

    }

    moveLeft()
    {
        super.moveLeft();
    }
}
