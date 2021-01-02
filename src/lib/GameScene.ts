import 'phaser';
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import Text = Phaser.GameObjects.Text;
import GameMap from './GameMap';
import Player from './Player';
import Tile from './Tile';

export class GameScene extends Phaser.Scene
{


    timeElapsed = 0;
    delta = 1000;

    map?: GameMap;
    player?: Player;
    sand?: StaticGroup;
    info?: Text;

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

        if(this.map) {

            this.map.getTiles().forEach((tile: Tile) => {
                tile.render();
            });

            if (this.player) {
                this.player.render(this.map);

                if (this.player.action) {
                    this.player.doAction();
                }
            }
        }

        // if (this.timeElapsed / 1000 > 30) {
        //     this.scene.start('ScoreScene', {
        //         timeElapsed: this.timeElapsed,
        //     });
        // }
    }

    //
    // private onClick(starImg: Phaser.Physics.Arcade.Image): () => void {
    //     return () => {
    //         starImg.setTint(0x00ff00);
    //         starImg.setVelocity(0, 0);
    //         this.time.delayedCall(100, (star: Sprite) => {
    //             star.destroy();
    //         }, [starImg], this);
    //     };
    // }
    //
    // private onFall(starImg: Phaser.Physics.Arcade.Image): () => void {
    //     return () => {
    //         starImg.setTint(0xff0000);
    //         this.time.delayedCall(100, (star: Sprite) => {
    //             star.destroy();
    //
    //             if (this.timeElapsed > 5) {
    //                 this.scene.start('ScoreScene', {
    //                     timeElapsed: this.timeElapsed,
    //                 });
    //             }
    //         }, [starImg], this);
    //     };
    // }
    //
    // private emitStar(): void {
    //     const x = Phaser.Math.Between(25, 775);
    //     const y = 26;
    //     const star = this.physics.add.image(x, y, 'star');
    //     star.setDisplaySize(50, 50);
    //     star.setVelocity(0, 200);
    //     star.setInteractive();
    //     star.on('pointerdown', this.onClick(star), this);
    //     if (this.sand) {
    //         this.physics.add.collider(star, this.sand,
    //             this.onFall(star), undefined, this);
    //
    //     }
    // }
}
