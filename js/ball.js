import {GameObject} from "./gameObject";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Ball extends GameObject {
    constructor(centerX, centerY, radius, game, texture) {
        let realCoords = game.abstractToReal(centerX, centerY);
        let realScale = game.abstractToReal(radius, radius);
        super(Matter.Bodies.circle(realCoords.x, realCoords.y, realScale.x, { isStatic: false, restitution: 0.5 }));
        this.game = game;
        Matter.Body.setMass(this.body, 10);
        this.radius = realScale.x;
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.height = this.radius * 2;
        this.sprite.width = this.radius * 2;
    }

    update() {
        let cornerCoords = this.game.calculateCorner(this.body.position.x, this.body.position.y, 2 * this.radius, 2 * this.radius);
        this.sprite.x = cornerCoords.x;
        this.sprite.y = cornerCoords.y;
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