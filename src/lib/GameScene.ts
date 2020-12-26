import 'phaser';
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import Text = Phaser.GameObjects.Text;
import Sprite = Phaser.GameObjects.Sprite;

export class GameScene extends Phaser.Scene
{

    delta = 1000;
    lastStarTime = 0;
    starsCaught = 0;
    starsFallen = 0;
    sand?: StaticGroup;
    info?: Text;

    constructor() {
        super({
            key: 'GameScene',
        });
    }

    init(): void {
        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }

    preload(): void {
        this.load.setBaseURL(
            'https://raw.githubusercontent.com/mariyadavydova/' +
            'starfall-phaser3-typescript/master/');
        this.load.image('star', 'assets/star.png');
        this.load.image('sand', 'assets/sand.jpg');
    }

    create(): void {
        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: 20,
        });
        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580));
        this.sand.refresh();
        this.info = this.add.text(10, 10, '10 fallen', { font: '24px Arial Bold', color: '#FBFBAC' });
    }

    update(time: number): void {
        const diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitStar();
        }

        if (this.info) {
            this.info.text =
                this.starsCaught + ' caught - ' +
                this.starsFallen + ' fallen (max 3)';
        }
    }

    private onClick(starImg: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            starImg.setTint(0x00ff00);
            starImg.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, (star: Sprite) => {
                star.destroy();
            }, [starImg], this);
        };
    }

    private onFall(starImg: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            starImg.setTint(0xff0000);
            this.starsFallen += 1;
            this.time.delayedCall(100, (star: Sprite) => {
                star.destroy();

                if (this.starsFallen > 2) {
                    this.scene.start('ScoreScene', {
                        starsCaught: this.starsCaught,
                    });
                }
            }, [starImg], this);
        };
    }

    private emitStar(): void {
        const x = Phaser.Math.Between(25, 775);
        const y = 26;
        const star = this.physics.add.image(x, y, 'star');
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        if (this.sand) {
            this.physics.add.collider(star, this.sand,
                this.onFall(star), undefined, this);

        }
    }
}
