import * as PIXI from 'pixi.js';
import World from './World';
import Sprite = PIXI.Sprite;
import InvalidResourceError from './Errors/InvalidResourceError';
import InvalidTextureError from './Errors/InvalidTextureError';
import { Viewport } from 'pixi-viewport';
import Point = PIXI.Point;
import Player from './Player';
import Ticker = PIXI.Ticker;
import DisplayObject = PIXI.DisplayObject;
import Creature from './Creature';
import autoDetectRenderer = PIXI.autoDetectRenderer;

export default class Game
{
    static instance?: Game;
    static tileSize = 32;
    static renderBox = 15;
    static renderWidth = Game.tileSize * Game.renderBox;
    static renderHeight = Game.tileSize * Game.renderBox;

    private renderCount = 0;
    private updateCount = 0;

    app: PIXI.Application;
    loader: PIXI.Loader;
    resources?: Partial<Record<string, PIXI.LoaderResource>>;
    viewport: Viewport;

    private tickLastUpdate = 0;
    private tickLastRender = 0;

    private creatures: Creature[] = [];
    private player?: Player;
    private world?: World;

    private running = false;
    private processing = false;

    private constructor()
    {
        this.app = new PIXI.Application({ width: Game.renderWidth, height: Game.renderHeight });
        document.body.appendChild(this.app.view);

        // create viewport
        this.viewport = new Viewport({
            screenWidth: Game.renderWidth,
            screenHeight: Game.renderHeight,
            worldWidth: Game.renderWidth,
            worldHeight: Game.renderHeight,
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


    animations(sheetName: string, animationName: string): PIXI.Texture[]
    {
        if (!this.resources) {
            throw new InvalidResourceError(sheetName);
        }

        const sheet = this.resources[sheetName];

        if (!sheet || !sheet.spritesheet || !sheet.spritesheet.animations) {
            throw new InvalidResourceError(sheetName);
        }

        return sheet.spritesheet.animations[animationName];
    }

    initialize()
    {
        if (this.running) {
            return;
        }

        this.loadResources()
            .then(() => {
                const worldPromise = this.generateWorld();
                const playerPromise = this.generatePlayer();

                return Promise.all([worldPromise, playerPromise]);
            })
            .then(([world, player]) => {
                this.world = world;
                this.player = player;

                this.running = true;
                this.player.moveTo(world.startTile.x, world.startTile.y);

                // add viewport last so it's in the foreground
                this.app.stage.addChild(this.viewport);
                this.viewport.scale = new Point(1.75, 1.75);

                this.app.ticker.add(() => {
                    const time = Date.now();
                    if (time - this.tickLastUpdate >= 1000) {
                        this.processTurn();
                    }

                    if (time - this.tickLastRender >= 1000 / this.app.ticker.maxFPS) {
                        this.render();
                    }
                });
            });
    }

    processTurn(): void
    {
        console.log({
            'processTurn called': {
                'this': this,
                'player': this.player,
                'action': this.player.action ?? undefined,
                'isProcessing': this.processing,
            },
        });

        if (!this.player || !this.player.action) {
            return;
        }

        if (this.processing) {
            return;
        }

        this.tickLastUpdate = Date.now();
        this.processing = true;

        console.log('processing', this.processing);

        this.player.takeTurn().then(() => {
            const creatureTurns: Promise<void>[] = [];
            this.creatures.forEach((creature: Creature) => {
                creatureTurns.push(creature.takeTurn());
            });

            Promise.all(creatureTurns).then(() => {
                this.processing = false;
                console.log('processing', this.processing);
            })
        });
    }

    render()
    {
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
                .add('hunter', 'assets/sprites/hunter.json')
                .load((loader, resources) => {
                    this.resources = resources;
                    resolve();
                });
        });
    }

    async generateWorld(): Promise<World>
    {
        return new Promise(resolve => {
            const world = new World(10, 10);
            this.viewport.addChild(world);
            resolve(world);
        });
    }

    async generatePlayer(): Promise<Player>
    {
        return new Promise(resolve => {
            const player = new Player(0, 0, 'hunter');
            Game.get().viewport.follow(player.sprite);
            this.viewport.addChild(player.sprite);
            resolve(player);
        });
    }

}
