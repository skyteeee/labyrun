import TWEEN from "@tweenjs/tween.js";
import * as PIXI from 'pixi.js';
import Matter from "matter-js";
import {Base} from "./base";
import {Ledge} from "./ledge";
import {Ball} from "./ball";
import {keyboard, findDistance} from "./utils";
import {Bridge} from "./bridge";

export class Game extends Base{
    constructor() {
        super();
        this.maxSpeed = 2;
        this.lastScale = 1;
        this.xForce = 0.175;
        this.scaleAnimationObject = {value: 1};
        this.currentScaleAnimation = null;
        this.yForce = -0.25;
        this.characters = {
            blueBall: null,
            greenBall: null
        }
    }

    updateViewport() {
        if (this.characters.greenBall !== null) {
            let position1 = this.characters.blueBall.body.position;
            let position2 = this.characters.greenBall.body.position;
            let x = (position1.x + position2.x) / 2;
            let y = (position1.y + position2.y) / 2;
            this.viewport.moveCenter(x, y);
            let scaleStep = 10;

            let scaleX = this.width / Math.abs(position1.x - position2.x) / 1.5;
            let scaleY = this.height / Math.abs(position1.y - position2.y) / 1.5;
            let scale = Math.min(scaleX, scaleY);
            scale = Math.min(1.5, scale);
            scale = Math.max(0.5, scale);

            scale = Math.floor((scale - 1) * 100 / scaleStep) * scaleStep / 100 + 1;

            if (scale !== this.lastScale) {
                this.startZoomUpdate(this.lastScale, scale);
                this.lastScale = scale;
            }
        }
    }

    startZoomUpdate(from, to) {
        if (this.currentScaleAnimation) {
            this.currentScaleAnimation.stop();
        }

        this.currentScaleAnimation = new TWEEN.Tween(this.scaleAnimationObject)
            .to({value: to}, 750)
            .onUpdate(() => {
            this.viewport.setZoom(this.scaleAnimationObject.value);
        }).start();
    }

    init() {
        this.initEngine();
    }

    setupResources() {
        super.setupResources();
        this.initGame();
    }

    moveBall(direction, body, force) {
        if (direction === 1) {
            Matter.Body.applyForce(body, body.position, {x: force, y: 0});
        } else  {
            if ( Math.abs(body.velocity.y) < this.maxSpeed) {
                Matter.Body.applyForce(body, body.position, {x: 0, y: force});
            }
        }
    }

    initWalls() {
        let ceiling = new Ledge(0, -22, 2000, 32, 0, this, "wall");
        ceiling.show();
        let ground = new Ledge(0, 590, 2000, 32, 0, this, "wall");
        ground.show();
        let leftWall = new Ledge(-22, 0, 32, 600, 0, this, "wall");
        leftWall.show();
        let rightWall = new Ledge(1990, 0, 32, 600, 0, this, "wall");
        rightWall.show();
    }

    initScene() {
        let testLedge = new Ledge(100, 450, 200, 32, 20, this);
        testLedge.show();
        let ledge2 = new Ledge(500, 200, 100, 32, 0, this);
        ledge2.show();
        let ledge3 = new Ledge(950, 400, 64, 16, 0, this);
        ledge3.show();
        let ledge4 = new Ledge(400, 542, 200, 48, 0, this);
        ledge4.show();
        let ledge5 = new Ledge(375, 375, 128, 32, 0, this);
        ledge5.show();
        let iceLedge1 = new Ledge(700, 250, 256, 32, -20, this, "ice");
        iceLedge1.show();
        let bounceLedge1 = new Ledge(500, 420, 100, 32, 0, this, "bounce");
        bounceLedge1.show();
        let bridge = new Bridge(100, 300, 300, 200, 20, 10, this);
        bridge.show();

    }

    initCharacters() {
        let ball = new Ball(250, 50, 15, this, this.tex.character);
        ball.show();

        this.characters.blueBall = ball;

        let greenBall = new Ball(500, 100, 15, this, this.tex.greenCharacter);
        greenBall.show();

        this.characters.greenBall = greenBall;
    }

    initControls() {
        let leftObject = keyboard("ArrowLeft");
        leftObject.press = () => {
            this.moveBall(1, this.characters.blueBall.body, -this.xForce);
        };

        let rightObject = keyboard("ArrowRight");
        rightObject.press = () => {
            this.moveBall(1, this.characters.blueBall.body, this.xForce);
        };

        let upObject = keyboard("ArrowUp");
        upObject.press = () => {
            this.moveBall(0, this.characters.blueBall.body, this.yForce);
        };

        let aObject = keyboard("a");
        aObject.press = () => {
            this.moveBall(1, this.characters.greenBall.body, -this.xForce);
        };

        let dObject = keyboard("d");
        dObject.press = () => {
            this.moveBall(1, this.characters.greenBall.body, this.xForce);
        };

        let wObject = keyboard("w");
        wObject.press = () => {
            this.moveBall(0, this.characters.greenBall.body, this.yForce);
        }
    }

    initGame() {

        this.initWalls();

        this.initCharacters();

        this.initScene();

        this.initControls();

    }

}