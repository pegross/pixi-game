import * as PIXI from 'pixi.js';
import Sprite = PIXI.Sprite;

const tileSize = 32;

const app = new PIXI.Application({ width: tileSize * 10, height: tileSize * 10 });
document.body.appendChild(app.view);

const loader = new PIXI.Loader();

loader.add('tiles', 'assets/sprites/tiles.json')
    .load((l, resources) => {
        const sheet = resources.tiles;

        if (!sheet || !sheet.textures || !sheet.textures['grass-medium']) {
            throw new Error('Error loading texture');
        }

        const texture = sheet.textures['grass-medium'];
        console.log(texture);

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const sprite = new Sprite(texture);
                sprite.x = x * tileSize;
                sprite.y = y * tileSize;
                sprite.interactive = true;
                sprite.on('mouseover', (e: Event) => {
                    console.log({ 'x': x, 'y': y });
                    sprite.alpha = 0.9;
                });
                sprite.on('mouseout', () => {
                    sprite.alpha = 1.0
                });

                app.stage.addChild(sprite);
            }
        }

    });

