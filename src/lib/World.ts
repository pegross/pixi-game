import * as PIXI from 'pixi.js';
import Game from './Game';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Player from './Player';

export default class World extends PIXI.Container
{

    widthTl: number;
    heightTl: number;

    start: Point;

    constructor(widthInTiles: number, heightInTiles: number)
    {
        super();

        this.start = new Point(2, 2);
        this.widthTl = widthInTiles;
        this.heightTl = heightInTiles;

        const texture = Game.get().texture('tiles', 'grass-dark-1');

        for (let x = 0; x < this.heightTl; x++) {
            for (let y = 0; y < this.widthTl; y++) {
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
                modY = -Game.tileSize;
            }
            if (event.key === 's') {
                modY = Game.tileSize;
            }
            if (event.key === 'a') {
                modX = -Game.tileSize;
            }
            if (event.key === 'd') {
                modX = Game.tileSize;
            }

            if (player.x + modX >= 0 && player.x + modX < this.width) {
                player.x += modX;
            }

            if (player.y + modY >= 0 && player.y + modY < this.height) {
                player.y += modY;
            }
        });
    }

}
