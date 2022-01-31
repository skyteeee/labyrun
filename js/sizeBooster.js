import {Booster} from "./booster";
import Matter from "matter-js";
import TWEEN from "@tweenjs/tween.js";

export class SizeBooster extends Booster{
    constructor(x, y, game) {
        super(20, 20, game.tex.speedBooster, Matter.Bodies.rectangle(x, y, 20, 20, {mass: 0.5}), game);
        this.type = "boost:size";
    }

    boost(ball) {
        ball.yForce *= 3;
        let oldScale = ball.sprite.scale.x;
        let changeObject = {scale: oldScale, pScale: ball.bodyScale};
        let tween = new TWEEN.Tween(changeObject)
            .to({scale: oldScale * 1.75, pScale: ball.bodyScale * 1.75}, 500)
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
                })
                .start();
            }, 10000);
        super.boost(ball);
    }
}