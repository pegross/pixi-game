import { GameScene } from './Scene/GameScene';
import Sprite = Phaser.GameObjects.Sprite;
import Image = Phaser.GameObjects.Image;

export default class GraphicsManager
{

    constructor(public scene: &GameScene, public renderTileSize = 32)
    {
    }

    addImage(x: number, y: number, textureName: string, frameName: string): Image
    {
        return this.scene.add.image(x * this.renderTileSize, y * this.renderTileSize, textureName, frameName);
    }

    addSprite(x: number, y: number, textureName: string, frameName: string): Sprite
    {
        return this.scene.add.sprite(x * this.renderTileSize, y * this.renderTileSize, textureName, frameName);
    }

    moveSprite(sprite: &Sprite, x: number, y: number, ms: number = 100, ease: string | Function = 'InOut')
    {
        this.scene.tweens.add({
            targets: sprite,
            x,
            y,
            ease,
            ms,
        });
    }
}
