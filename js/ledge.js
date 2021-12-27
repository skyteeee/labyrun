import {GameObject} from "./gameObject";
import Matter from "matter-js";
import * as PIXI from "pixi.js";

export class Ledge extends GameObject{
    constructor(x, y, width, height, angle, game, type = "brick") {
        let realCoords = game.abstractToReal(x, y);
        let realScale = game.abstractToReal(width, height);
        let centerCoords = game.calculateCenter(realCoords.x, realCoords.y, realScale.x, realScale.y);
        let parameters = { isStatic: true };

        if (type === "wall") {
            parameters.slop = 0.1;
        }

        super(Matter.Bodies.rectangle(centerCoords.x, centerCoords.y, realScale.x, realScale.y, parameters));

        Matter.Body.setAngle(this.body, angle * Math.PI / 180);
        this.sprite = new PIXI.TilingSprite(game.tex.ledge);
        this.sprite.tileScale.set(0.5);
        this.sprite.anchor.set(0.5, 0.5);
        this.game = game;
        this.width = realScale.x;
        this.height = realScale.y;
        this.sprite.width = this.width;
        this.sprite.height = this.height;

        if (type === "brick") {
            this.sprite.texture = game.tex.ledge;
        }

        if (type === "ice") {
            this.sprite.texture = game.tex.ice;
            this.sprite.tileScale.set(0.25);
            this.body.friction = -0.01;
        }

        if (type === "bounce") {
            this.sprite.texture = game.tex.bouncer;
            this.body.restitution = 1.25;
        }

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