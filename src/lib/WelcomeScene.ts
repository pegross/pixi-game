import 'phaser';

export class WelcomeScene extends Phaser.Scene
{
    title?: Phaser.GameObjects.Text;
    hint?: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'WelcomeScene',
        });
    }

    create(): void {
        const titleText: string = 'Rogue it up';

        this.title = this.add.text(200, 250, titleText,
            { font: '48px Arial Bold', color: '#FBFBAC' });

        const hintText = 'Click to die';

        this.hint = this.add.text(300, 350, hintText, { font: '48px Arial Bold', color: '#FBFBAC'});

        this.input.on('pointerdown', () => {
            this.scene.start('GameScene');
        }, this);
    }
}
