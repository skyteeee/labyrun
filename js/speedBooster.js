import {Booster} from "./booster";
import Matter from "matter-js";
import * as pixiFilters from "pixi-filters";

export class SpeedBooster extends Booster{
    constructor(x, y, game) {
        super(30, 30, game.tex.speedBooster, Matter.Bodies.rectangle(x, y, 30, 30, {mass: 0.2}), game);
        this.type = "boost:speed";
    }

    boost(ball) {
        ball.pushForce = ball.defaultPushForce * 2;
        ball.yForce = ball.defaultYForce * 1.75;
        ball.sprite.filters = [new pixiFilters.GlowFilter({color: 0xFF7363})];
        setTimeout(() => {
            ball.pushForce = ball.defaultPushForce;
            ball.yForce = ball.defaultYForce;
            ball.sprite.filters = [];
        }, 10000);
        super.boost(ball);
    }

}