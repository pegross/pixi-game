import 'phaser';
import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import Text = Phaser.GameObjects.Text;
import Sprite = Phaser.GameObjects.Sprite;

export class ScoreScene extends Phaser.Scene
{
    score: number = 0;
    result?: Phaser.GameObjects.Text;
    hint?: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    init(params: any): void {
        this.score = params.starsCaught;
    }

    create(): void {
        const resultText: string = 'Your score is ' + this.score + '!';
        const hintText: string = 'Click to restart';

        this.result = this.add.text(200, 250, resultText,
            { font: '48px Arial Bold', color: '#FBFBAC' });

        this.hint = this.add.text(300, 350, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });

        this.input.on('pointerdown', () => {
            this.scene.start('WelcomeScene');
        }, this);
    }
}
