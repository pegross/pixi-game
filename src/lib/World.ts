import * as PIXI from 'pixi.js';
import Game from './Game';
import Sprite = PIXI.Sprite;

export default class World extends PIXI.Container
{

    constructor()
    {
        super();

        const texture = Game.get().texture('tiles', 'grass-medium');

        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 20; y++) {
                const sprite = new Sprite(texture);
                sprite.x = x * Game.tileSize;
                sprite.y = y * Game.tileSize;
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

        const playerTexture = Game.get().texture('tiles', 'wood-plank');
        const player = new Sprite(playerTexture);
        player.x = Game.tileSize * 10;
        player.y = Game.tileSize * 10;
        this.addChild(player);
        Game.get().viewport.follow(player);

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

            if (player.x + modX >= 0 && player.x + modX < 20 * Game.tileSize) {
                player.x += modX;
            }

            if (player.y + modY >= 0 && player.y + modY < 20 * Game.tileSize) {
                player.y += modY;
            }
        });


    }

}
