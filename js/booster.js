import {SpriteObject} from "./spriteObject";
import TWEEN from "@tweenjs/tween.js";

export class Booster extends SpriteObject{
    constructor(width, height, sprite, body, game) {
        super(width, height, sprite, body, game);
        this.type = "boost:";
    }

    boost(ball) {
        this.die();
    }

    die() {
        let changeObject = {scale: this.sprite.scale.x, pScale: 1, alpha: 1};
        let tween = new TWEEN.Tween(changeObject)
            .to({scale: 0.2 * this.sprite.scale.x, pScale: 0.2, alpha: 0}, 500)
            .onUpdate(() => {
                this.sprite.scale.x = changeObject.scale;
                this.sprite.scale.y = changeObject.scale;
                this.sprite.alpha = changeObject.alpha;
                this.scaleBody(changeObject.pScale);
            }).onComplete(() => {
                this.hide();
            }).start();
    }

}