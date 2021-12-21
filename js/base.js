import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

export class Base {
    constructor() {
        this.app = null;
        this.height = 0;
        this.width = 0;
        this.cnt = {};
        this.tex = null;
        this.animatedObjects = [];
        this.lastTime = null;
        this.delayed = [];
    }

    refresh(time) {
        this.updatePhysics(time);
        this.animate(time);
        if (this.decideToRefresh()) {
            requestAnimationFrame((time1) => {this.refresh(time1)});
        }
    }

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

    initEngine() {
        let div = document.getElementById('fieldHolder');
        let versionElem = document.getElementById('version');
        this.version = versionElem.innerText.split(' ')[0];
        this.height = div.offsetHeight;
        this.width = div.offsetWidth;

        this.phEngine = Matter.Engine.create();


        this.app = new PIXI.Application({
            width: this.width, height: this.height,
            antialias: true, backgroundColor: 0xeaeae4, resolution: window.devicePixelRatio || 1
        });
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

        this.cnt.field = new PIXI.Container();
        this.cnt.background = new PIXI.Container();
        this.cnt.game = new PIXI.Container();

        this.app.stage.addChild(this.cnt.field);
        this.cnt.field.addChild(this.cnt.background);
        this.cnt.field.addChild(this.cnt.game);

        this.cnt.game.sortableChildren = true;

        this.app.loader.add('img/gameAtlas.json')
            .add('fonts/mainfont2.xml')
            .load(() => {
                this.setupResources();
            });
    }

    setupResources() {
        let div = document.getElementById('fieldHolder');
        div.appendChild(this.app.view);
        this.tex = {allImg: this.app.loader.resources['img/gameAtlas.json'].textures};
        this.tex.character = this.tex.allImg["ball_lblue.png"];
        this.tex.ledge = this.tex.allImg["ledge-1.png"];
    }

}