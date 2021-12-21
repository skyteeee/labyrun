import TWEEN from "@tweenjs/tween.js";
import * as PIXI from 'pixi.js';
import {Base} from "./base";
import {Ledge} from "./ledge";

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
        let sprite = new PIXI.Sprite(this.tex.character);
        sprite.x = 100;
        sprite.y = 20;
        this.cnt.game.addChild(sprite);

        let testLedge = new Ledge(400, 250, 300, 50, 10, this);
        testLedge.show();

    }

}