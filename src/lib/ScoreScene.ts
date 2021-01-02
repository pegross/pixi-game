import 'phaser';

export class ScoreScene extends Phaser.Scene
{
    timeElapsed: number = 0;
    title?: Phaser.GameObjects.Text;
    hint?: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'ScoreScene',
        });
    }

    init(params: any): void {
        this.timeElapsed = params.timeElapsed;
    }

    create(): void {
        const titleText: string = 'Time elapsed: ' + this.timeElapsed;

        this.title = this.add.text(200, 250, titleText,
            { font: '32px Arial Bold', color: '#FFF000' });

        const hintText: string = 'Click to restart';

        this.hint = this.add.text(300, 350, hintText,
            { font: '24px Arial Bold', color: '#FBFBAC' });

        this.input.on('pointerdown', () => {
            this.scene.start('WelcomeScene');
        }, this);
    }
}
