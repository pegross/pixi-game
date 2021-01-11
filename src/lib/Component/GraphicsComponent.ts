import 'phaser';
import Sprite = Phaser.GameObjects.Sprite;
import { Component } from './Component';
import Scene = Phaser.Scene;
import { EntityComponent } from './EntityComponent';

export default class GraphicsComponent implements Component
{
    static DEFAULT_TEXTURE = 'priest';
    static DEFAULT_FRAME = 'left_01';

    static TILE_SIZE = 64;

    protected sprite?: Sprite;

    constructor(public entity: EntityComponent,
                public scene: Scene,
                public textureName: string = GraphicsComponent.DEFAULT_TEXTURE,
                public frameName: string = GraphicsComponent.DEFAULT_FRAME)
    {
        const x = GraphicsComponent.tileToPx(this.entity.gridX);
        const y = GraphicsComponent.tileToPx(this.entity.gridY);
        this.sprite = this.scene.add.sprite(x, y, this.textureName, this.frameName);
    }

    static tileToPx(tile: number)
    {
        return tile * GraphicsComponent.TILE_SIZE;
    }

    update(): void
    {
        this.scene.tweens.add({
            targets: [this.sprite],
            x: GraphicsComponent.tileToPx(this.entity.gridX),
            y: GraphicsComponent.tileToPx(this.entity.gridY),
            ease: 'InOut',
            duration: 100,
        });
    }

}
