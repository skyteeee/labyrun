import {Booster} from "./booster";
import Matter from "matter-js";
import TWEEN from "@tweenjs/tween.js";

export class SizeBooster extends Booster{
    constructor(x, y, game) {
        super(20, 20, game.tex.speedBooster, Matter.Bodies.rectangle(x, y, 20, 20, {mass: 0.5}), game);
        this.type = "boost:size";
        this.heavyFactor = 1.75;
    }

    boost(ball) {
        if (!this.consumed && !ball.isBoosted) {
            super.boost(ball);
            ball.yForce *= 3;
            let oldScale = ball.sprite.scale.x;
            let changeObject = {scale: oldScale, pScale: ball.bodyScale};
            let tween = new TWEEN.Tween(changeObject)
                .to({scale: oldScale * this.heavyFactor, pScale: ball.bodyScale * this.heavyFactor}, 500)
                .onUpdate(() => {
                    ball.sprite.scale.x = changeObject.scale;
                    ball.sprite.scale.y = changeObject.scale;
                    ball.scaleBody(changeObject.pScale);
                })
                .start();

            setTimeout(() => {
                ball.yForce = ball.defaultYForce;
                let tween = new TWEEN.Tween(changeObject)
                    .to({scale: oldScale, pScale: 1}, 500)
                    .onUpdate(() => {
                        ball.sprite.scale.x = changeObject.scale;
                        ball.sprite.scale.y = changeObject.scale;
                        ball.scaleBody(changeObject.pScale);
                    }).onComplete(() => {
                      ball.isBoosted = false;
                    }).start();
            }, 10000);
        }
    }
}