import * as PIXI from 'pixi.js';
import TilingSprite = PIXI.TilingSprite;
import Sprite = PIXI.Sprite;


PIXI.Loader.shared.add('assets/sprites/tiles.json')
    .load(setup);


function setup() {
    const app = new PIXI.Application({ width: 256, height: 256 });
    const sheet = PIXI.Loader.shared.resources['assets/sprites/tiles.json'].data;

    if (!sheet) {
        throw new Error(('Sheet undefined'));
    }

    const sprite = new Sprite(sheet['grass-bright-1']);

    app.stage.addChild(sprite);
    document.body.appendChild(app.view);
}

