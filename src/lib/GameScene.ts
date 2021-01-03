import 'phaser';
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import Text = Phaser.GameObjects.Text;
import GameMap from './GameMap';
import Player from './Player';
import Tile from './Tile';
import Creature from './Creature';

export class GameScene extends Phaser.Scene
{


    timeElapsed = 0;
    delta = 1000;

    creatures: Creature[] = [];

    player?: Player;
    map?: GameMap;

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
        this.map = new GameMap(7, 7, this);
        this.player = new Player(this.map, 5, 5);

        this.creatures.push(new Creature('hunter', 'left_01', this.map, 3, 3));
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

        if (this.map) {

            this.map.getTiles().forEach((tile: Tile) => {
                tile.render();
            });

            this.creatures.forEach((creature: Creature) => {
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

    nextTurn() {
        this.creatures.forEach((creature: Creature) => {
            creature.setRandomAction();
            creature.doAction();
        });
    }

}

