import TWEEN from "@tweenjs/tween.js";
import * as PIXI from 'pixi.js';
import Matter from "matter-js";
import {Base} from "./base";
import {Ledge} from "./ledge";
import {Ball} from "./ball";
import {keyboard} from "./utils";

export class Game extends Base{
    constructor() {
        super();
    }

    init() {
        this.initEngine();
    }

    setupResources() {
        super.setupResources();
        this.initGame();
    }

    initGame() {
        let ball = new Ball(300, 100, 25, this);
        ball.show();

        let testLedge = new Ledge(200, 250, 300, 48, 10, this);
        testLedge.show();

        let ground = new Ledge(0, 590, 1000, 10, 0, this);
        ground.show();

        let leftObject = keyboard("ArrowLeft");
        leftObject.press = () => {console.log("Left pressed!")};

    }

}