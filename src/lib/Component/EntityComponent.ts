import { Component } from './Component';
import GraphicsComponent from './GraphicsComponent';
import Scene = Phaser.Scene;

export abstract class EntityComponent implements Component
{
    public gridX = 0;
    public gridY = 0;
    public height = 0;
    public width = 0;

    public graphics: GraphicsComponent;

    protected constructor(scene: Scene) {
        this.graphics = new GraphicsComponent(this, scene);
    }

    update(): void
    {
        this.graphics.update();
    }
}
