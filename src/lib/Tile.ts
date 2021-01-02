import 'phaser';
import GameMap from './GameMap';
import Entity from './Entity';

export default class Tile extends Entity
{

    protected map: GameMap;

    constructor(frame: string, map: GameMap, x: number, y: number)
    {
        super('tiles', frame, map, x, y);
        this.map = map;
    }

    render()
    {
        super.render(this.map);
    }
}
