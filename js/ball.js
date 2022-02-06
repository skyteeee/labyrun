import {GameObject} from "./gameObject";
import Matter from "matter-js";
import * as PIXI from "pixi.js";
import {SpriteObject} from "./spriteObject";

export class Ball extends SpriteObject {
    constructor(centerX, centerY, radius, game, texture) {
        super(radius * 2, radius * 2, texture, Matter.Bodies.circle(centerX, centerY, radius, { isStatic: false, restitution: 0.5, mass: 10 }), game);
        this.moving = 0;
        this.jumps = 2;
        this.movingForce = 0.009;
        this.defaultPushForce = 0.15;
        this.pushForce = this.defaultPushForce;
        this.defaultYForce = -0.25;
        this.isBoosted = false;
        this.yForce = this.defaultYForce;
    }

    startMovement(direction) {
        Matter.Body.applyForce(this.body, this.body.position, {x: this.pushForce * direction, y: 0});
        this.moving = direction;
    }

    stopMovement(direction) {
        if (this.moving === direction) {
            this.moving = 0;
        }
    }

    move() {
        if (this.moving) {
            Matter.Body.applyForce(this.body, this.body.position, {x: this.movingForce * this.moving, y: 0});
        }
    }

    jump() {
        if ( Math.abs(this.body.velocity.y) < this.game.maxSpeed && this.jumps) {
            Matter.Body.applyForce(this.body, this.body.position, {x: 0, y: this.yForce});
            this.jumps --;
        }
    }

    collisionStart(withBody) {
        if (withBody.gameObject.type && withBody.gameObject.type.startsWith("boost:")) {
            withBody.gameObject.boost(this);
        }
        this.resetJumps();
    }

    resetJumps() {
        this.jumps = 2;
    }


    update() {
        super.update();
        this.move();
    }

}