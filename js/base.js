import * as PIXI from 'pixi.js';
import {Viewport} from "pixi-viewport";
import Matter from 'matter-js';
import {findDistance} from "./utils";

export class Base {
    constructor() {
        this.app = null;
        this.height = 0;
        this.width = 0;
        this.windowDiagonal = 0;
        this.cnt = {};
        this.tex = null;
        this.animatedObjects = [];
        this.lastTime = null;
        this.delayed = [];
    }

    refresh(time) {
        this.updatePhysics(time);
        this.animate(time);
        this.updateViewport();
        if (this.decideToRefresh()) {
            requestAnimationFrame((time1) => {this.refresh(time1)});
        }
    }

    updateViewport() {}

    updatePhysics(time) {
        const delta = 16.666;
        let timePassed = delta;
        if (this.lastTime && time > this.lastTime) {
            timePassed = time - this.lastTime;
        }
        Matter.Engine.update(this.phEngine, delta, delta/timePassed);
    }

    animate(time) {
        if (this.lastTime === null) {
            this.lastTime = time;
        }
        let elapsed = (time - this.lastTime) * 0.001;
        this.lastTime = time;
        TWEEN.update(time);
        for (let object of this.animatedObjects) {
            object.update(elapsed);
        }
        if (Object.keys(TWEEN._tweens).length === 0 && this.delayed.length > 0) {
            this.destroyDelayed();
        }
    }

    destroyDelayed () {
        console.log(`Destroying ${this.delayed.length} objects.`);
        for (let delayedObj of this.delayed) {
            delayedObj.obj.destroy({children: delayedObj.children});
        }
        this.delayed = [];
    }

    addDelayed (object, children = false) {
        object.parent.removeChild(object);
        this.delayed.push({obj: object, children: children});
    }

    addAnimatedObject(object) {
        this.animatedObjects.push(object);
    }

    removeAnimatedObject(object) {
        for (let index in this.animatedObjects) {
            let element = this.animatedObjects[index];
            if (element === object) {
                this.animatedObjects.splice(index, 1);
                break;
            }
        }
    }

    decideToRefresh() {
        return true;
    }

    onCollisionStart(pairs) {

    }

    initEngine() {
        let div = document.getElementById('fieldHolder');
        let versionElem = document.getElementById('version');
        this.version = versionElem.innerText.split(' ')[0];
        this.height = div.offsetHeight;
        this.width = div.offsetWidth;

        this.phEngine = Matter.Engine.create();

        Matter.Events.on(this.phEngine, "collisionStart", (pairs) => {
            this.onCollisionStart(pairs);
        });

        this.app = new PIXI.Application({
            width: this.width, height: this.height,
            antialias: true, backgroundColor: 0xeaeae4, resolution: window.devicePixelRatio || 1
        });

        this.viewport = new Viewport({
            screenWidth: this.width,
            screenHeight: this.height,
            worldWidth: 2000,
            worldHeight: 600
        });

        this.windowDiagonal = findDistance(0, 0, this.width, this.height);

        this.viewport.decelerate({friction:0.95});
        this.viewport.clamp({direction: "all"});

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

        this.cnt.field = new PIXI.Container();
        this.cnt.background = new PIXI.Container();
        this.cnt.game = new PIXI.Container();

        this.app.stage.addChild(this.viewport);
        this.viewport.addChild(this.cnt.field);
        this.cnt.field.addChild(this.cnt.background);
        this.cnt.field.addChild(this.cnt.game);

        this.cnt.game.sortableChildren = true;

        this.app.loader.add('img/gameAtlas.json')
            .add('fonts/mainfont2.xml')
            .load(() => {
                this.setupResources();
            });
    }

    abstractToReal(x, y) {
        return {x: x, y: y};
    }

    calculateCorner(centerX, centerY, width, height) {
        let cornerX = centerX - 0.5 * width;
        let cornerY = centerY - 0.5 * height;
        return {x: cornerX, y: cornerY};
    }

    calculateCenter(cornerX, cornerY, width, height) {
        let centerX = cornerX + 0.5 * width;
        let centerY = cornerY + 0.5 * height;
        return {x: centerX, y: centerY};
    }

    setupResources() {
        let div = document.getElementById('fieldHolder');
        div.appendChild(this.app.view);
        this.tex = {allImg: this.app.loader.resources['img/gameAtlas.json'].textures};
        this.tex.character = this.tex.allImg["ball_lblue.png"];
        this.tex.ledge = this.tex.allImg["bricks-1.png"];
        this.tex.greenCharacter = this.tex.allImg["ball_green.png"];
        this.tex.ice = this.tex.allImg["ice.png"];
        this.tex.bouncer = this.tex.allImg["bouncer.png"];
        this.tex.bridgePiece = this.tex.allImg["bridge_1.png"];
        this.tex.speedBooster = this.tex.allImg["speedBooster.png"];
    }

}