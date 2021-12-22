import {GameObject} from "./gameObject";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Ledge extends GameObject{
    constructor(x, y, width, height, angle, game) {
        let realCoords = game.abstractToReal(x, y);
        let realScale = game.abstractToReal(width, height);
        let centerCoords = game.calculateCenter(realCoords.x, realCoords.y, realScale.x, realScale.y);

        super(Matter.Bodies.rectangle(centerCoords.x, centerCoords.y, realScale.x, realScale.y, { isStatic: true }));

        Matter.Body.setAngle(this.body, angle * Math.PI / 180);
        this.sprite = new PIXI.TilingSprite(game.tex.ledge);
        this.sprite.tileScale.set(0.5);
        this.sprite.anchor.set(0.5, 0.5);
        this.game = game;
        this.width = realScale.x;
        this.height = realScale.y;
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
       Matter.Composite.add(this.game.phEngine.world, this.body);
    }

    hide() {
        this.game.cnt.game.removeChild(this.sprite);
        this.game.removeAnimatedObject(this);
    }

}