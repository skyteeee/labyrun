import {GameObject} from "./gameObject";
import * as PIXI from "pixi.js";

export class SpriteObject extends GameObject{
    constructor(width, height, tex, body, game) {
        super(body, game);
        this.sprite = new PIXI.Sprite(tex);
        this.sprite.width = width;
        this.sprite.height = height;
        this.type = "sprite";
        this.sprite.anchor.set(0.5, 0.5);
    }

    show() {
        super.show();
        this.game.cnt.game.addChild(this.sprite);
        this.game.addAnimatedObject(this);
    }

    hide() {
        super.hide();
        this.game.cnt.game.removeChild(this.sprite);
        this.game.removeAnimatedObject(this);
    }

    update() {
        this.sprite.x = this.body.position.x;
        this.sprite.y = this.body.position.y;
        this.sprite.rotation = this.body.angle;
    }


}