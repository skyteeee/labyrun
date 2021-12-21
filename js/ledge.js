import {GameObject} from "./gameObject";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Ledge extends GameObject{
    constructor(x, y, width, height, angle, game) {
        super(Matter.Bodies.rectangle(x, y, width, height, { isStatic: true }));
        Matter.Body.setAngle(this.body, angle * Math.PI / 180);
        this.sprite = new PIXI.Sprite(game.tex.ledge);
        this.game = game;
        this.width = width;
        this.height = height;
        this.sprite.width = this.width;
        this.sprite.height = this.height;
    }

    update() {
        this.sprite.x = this.body.position.x;
        this.sprite.y = this.body.position.y;
        this.sprite.rotation = this.body.angle;
    }

    show() {
       this.game.cnt.game.addChild(this.sprite);
       this.game.addAnimatedObject(this);
    }

    hide() {
        this.game.cnt.game.removeChild(this.sprite);
        this.game.removeAnimatedObject(this);
    }

}