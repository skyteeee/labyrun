import {SpriteObject} from "./spriteObject";
import Matter from "matter-js";

export class SpeedBooster extends SpriteObject{
    constructor(x, y, game) {
        super(30, 30, game.tex.speedBooster, Matter.Bodies.rectangle(x, y, 30, 30, {mass: 0.2}), game);
    }

}