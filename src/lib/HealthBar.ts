import 'phaser';
import { GameScene } from './GameScene';
import Graphics = Phaser.GameObjects.Graphics;
import Creature from './Creature';
import World from './World';

export default class HealthBar
{

    creature: Creature;
    bar: Graphics;

    x: number = 0;
    y: number = 0;

    constructor(creature: Creature)
    {
        this.creature = creature;
        this.bar = new Graphics(creature.getWorld().renderScene);
        this.bar.setDepth(5);
        this.creature.getWorld().renderScene.add.existing(this.bar);
    }

    render()
    {
        const borderSize = 2;
        const width = World.TILE_SIZE * 0.75;
        const height = 6;

        const marginTop = -10;

        const posX = this.x - (width / 2);
        const posY = this.y - (World.TILE_SIZE / 2) + marginTop;

        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(posX, posY, width + 2 * borderSize, height + 2 * borderSize);

        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(posX + borderSize, posY + borderSize, width, height);

        const percentage = this.creature.health / this.creature.maxHealth;

        if (percentage < 0.5) {
            this.bar.fillStyle(0xff0000);
        } else {
            this.bar.fillStyle(0x00ff00);
        }

        this.bar.fillRect(posX + borderSize, posY + borderSize, percentage * width, height);
    }

    remove()
    {
        this.bar.clear();
    }

}
