import {GameObject} from "./gameObject";
import Matter from "matter-js";
import * as PIXI from "pixi.js"

export class BridgePiece extends GameObject{
    constructor(x, y, width, height, group, game) {
        let realScale = game.abstractToReal(width, height);
        super(Matter.Bodies.rectangle(x, y, realScale.x, realScale.y, {collisionFilter: {group: group}}));
        this.width = realScale.x;
        this.height = realScale.y;
        this.sprite = new PIXI.Sprite(game.tex.bridgePiece);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.width = realScale.x;
        this.sprite.height = realScale.y;
        this.game = game;
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

}