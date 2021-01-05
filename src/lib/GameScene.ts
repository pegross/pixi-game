import 'phaser';
import Player from './Player';
import Tile from './Tile';
import Creature from './Creature';
import World from './World';

export class GameScene extends Phaser.Scene
{


    timeElapsed = 0;
    delta = 1000;

    creatures: Creature[] = [];

    player?: Player;
    world?: World;

    constructor()
    {
        super({
            key: 'GameScene',
        });
    }

    init(): void
    {
        this.timeElapsed = 0;
        this.delta = 1000;
    }

    preload(): void
    {
        this.load.atlas('tiles', 'assets/sprites/tiles.png', 'assets/sprites/tiles.json');
        this.load.atlas('hunter', 'assets/sprites/hunter.png', 'assets/sprites/hunter.json');
        this.load.atlas('priest', 'assets/sprites/priest.png', 'assets/sprites/priest.json');

        const worldWidth = 20;
        const worldHeight = 20;
        this.world = new World(worldWidth, worldHeight, this);
        this.player = new Player(this.world);
        this.player.setPosition(5,5);

        this.cameras.main.setBackgroundColor('#000');

        const enemyCount = 20;
        for(let i = 0; i < enemyCount; i++) {
            const x = Math.floor(Math.random() * worldWidth);
            const y = Math.floor(Math.random() * worldHeight);
            const enemy = new Creature('priest', 'left_01', this.world);
            enemy.setPosition(x, y);
            this.creatures.push(enemy);
        }
    }


    create(): void
    {
        if (this.player) {
            this.player.listenScene(this);
        }
    }

    update(time: number): void
    {
        this.timeElapsed = time;

        if (this.world) {

            this.world.getTilesFlat().forEach((tile: Tile) => {
                tile.render();
            });

            this.creatures.forEach((creature: Creature, index: number, object: Creature[]) => {
                // remove dead creature from scene
                if (creature.isDead) {
                    object.splice(index, 1);
                    return;
                }

                creature.render();
            });

            if (this.player) {
                this.player.render();
                if (this.player.action) {
                    this.player.doAction();
                }
            }
        }
    }

    // TODO: having this on the scene seems weird... move to World
    nextTurn()
    {
        this.creatures.forEach((creature: Creature) => {
            creature.setRandomAction();
            creature.doAction();
        });
    }

}

