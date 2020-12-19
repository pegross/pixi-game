import * as PIXI from 'pixi.js';
import Game from './Game';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Player from './Player';

export default class World extends PIXI.Container
{

    widthTiles: number;
    heightTiles: number;

    start: Point;

    constructor(widthInTiles: number, heightInTiles: number)
    {
        super();

        this.start = new Point(2, 2);
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

    addPlayer(player: Player)
    {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            let modY = 0;
            let modX = 0;

            if (event.key === 'w') {
                modY = -1;
            }
            if (event.key === 's') {
                modY = 1;
            }
            if (event.key === 'a') {
                modX = -1;
            }
            if (event.key === 'd') {
                modX = 1;
            }

            // check boundaries and move
            if (player.tileX + modX >= 0
                && player.tileX + modX < this.widthTiles
                && player.tileY + modY >= 0
                && player.tileY + modY < this.heightTiles) {
                player.moveTo(player.tileX + modX, player.tileY + modY);
            }
        });
    }

}
