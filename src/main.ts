import * as PIXI from 'pixi.js';
import Sprite = PIXI.Sprite;


const app = new PIXI.Application({ width: 256, height: 256 });
document.body.appendChild(app.view);

app.loader
    .add('tiles', 'assets/sprites/tiles.json')
    .load((loader, resources) => {
        const sprite = new Sprite(resources['grass-bright-1']);
        app.stage.addChild(sprite);

    });


function setup() {
    const sheet = app.loader.resources['assets/sprites/tiles.json'];

    console.log(sheet);
    if (!sheet) {
        throw new Error(('Sheet undefined'));
    }

    app.stage.addChild(sprite);
}

