import * as PIXI from 'pixi.js';
import World from './World';
import Sprite = PIXI.Sprite;
import InvalidResourceError from './Errors/InvalidResourceError';
import InvalidTextureError from './Errors/InvalidTextureError';
import { Viewport } from 'pixi-viewport';

export default class Game
{

    app: PIXI.Application;
    loader: PIXI.Loader;
    resources?: Partial<Record<string, PIXI.LoaderResource>>;
    viewport: Viewport;

    private running = false;

    static instance?: Game;
    static tileSize = 32;

    private constructor()
    {
        this.app = new PIXI.Application({ width: Game.tileSize * 10 + 500, height: Game.tileSize * 10 + 500 });
        document.body.appendChild(this.app.view);

        // create viewport
        this.viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            interaction: this.app.renderer.plugins.interaction,
        });

        this.loader = new PIXI.Loader();

    }

    texture(sheetName: string, textureName: string): PIXI.Texture
    {
        if (!this.resources) {
            throw new InvalidResourceError(sheetName);
        }

        const sheet = this.resources[sheetName];

        if (!sheet || !sheet.textures) {
            throw new InvalidResourceError(sheetName);
        }

        if (!sheet.textures[textureName]) {
            throw new InvalidTextureError(textureName);
        }

        return sheet.textures[textureName];
    }

    start()
    {
        if (this.running) {
            return;
        }
        this.loadResources()
            .then(() => {
                this.addBackground();
                this.generateWorld();

            })
            .then(() => {
                // add viewport last so it's in the foreground
                this.app.stage.addChild(this.viewport);
            });
    }

    static get(): Game
    {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }


    async loadResources(): Promise<void>
    {
        return new Promise(resolve => {
            this.loader
                .add('tiles', 'assets/sprites/tiles.json')
                .add('cinematic', 'assets/sprites/cinematic.json')
                .add('furniture', 'assets/sprites/furniture.json')
                .load((loader, resources) => {
                    this.resources = resources;
                    resolve();
                });
        });
    }

    async addBackground(): Promise<void>
    {
        return new Promise(resolve => {

            const texture = this.texture('cinematic', 'background');
            const background = new PIXI.Container();

            for (let x = 0; x * texture.width <= this.app.screen.width; x++) {
                for (let y = 0; y * texture.height <= this.app.screen.height; y++) {
                    const sprite = new Sprite(texture);
                    background.addChild(sprite);
                    sprite.x = x * texture.width;
                    sprite.y = y * texture.height;
                }
            }

            this.app.stage.addChild(background);
            background.width = this.app.screen.width;
            background.height = this.app.screen.height;
        });
    }

    async generateWorld(): Promise<void>
    {
        return new Promise(resolve => {

            const world = new World();
            this.viewport.addChild(world);

            world.x = this.app.screen.width / 2;
            world.y = this.app.screen.height / 2;
            world.pivot.x = world.width / 2;
            world.pivot.y = world.height / 2;

            resolve();
        });
    }

}
