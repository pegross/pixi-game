import * as PIXI from 'pixi.js';
import Sprite = PIXI.Sprite;
import Point = PIXI.Point;
import Game from './Game';
import AnimatedSprite = PIXI.AnimatedSprite;

type DirectionX = 'left' | 'right';
type DirectionY = 'up' | 'down';

export default class Creature
{

    directionX: DirectionX = 'right';
    directionY: DirectionY = 'down';

    sprite: AnimatedSprite;
    animationSheet: string;

    tileX: number;
    tileY: number;

    constructor(startTileX: number, startTileY: number, animationSheet: string)
    {
        this.animationSheet = animationSheet;
        this.sprite = new AnimatedSprite(Game.get().animations(animationSheet, 'left'));
        this.sprite.anchor = new Point(0.5, 0.5);

        this.tileX = 0;
        this.tileY = 0;

        this.moveTo(startTileX, startTileY);
    }

    getDirectionAnimationName(): string
    {
        let name: string = this.directionX;
        if (this.directionY === 'up') {
            name = 'back_' + name;
        }
        return name;
    }

    playAnimation(animationName: string)
    {
        this.sprite.textures = Game.get().animations(this.animationSheet, animationName);
        this.sprite.anchor = new Point(0.5, 0.5);
        this.sprite.animationSpeed = 0.2;
        this.sprite.loop = true;
        this.sprite.play();
    }

    moveTo(tileX: number, tileY: number): void
    {
        console.log(tileX, tileY);
        if (tileX > this.tileX) {
            this.directionX = 'right';
        }

        if (tileX < this.tileX) {
            this.directionX = 'left'
        }

        if (tileY > this.tileY) {
            this.directionY = 'down';
        }

        if (tileY < this.tileY) {
            this.directionY = 'up';
        }

        this.playAnimation(this.getDirectionAnimationName());
        this.tileX = tileX;
        this.tileY = tileY;
        this.sprite.x = tileX * Game.tileSize;
        this.sprite.y = tileY * Game.tileSize;
        console.log(tileX, tileY);
    }
}
