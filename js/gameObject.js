import Matter from "matter-js";

export class GameObject {
    constructor(physicalBody, game) {
        this.body = physicalBody;
        this.game = game;
        this.bodyScale = 1;
        this.body.gameObject = this;
    }

    scaleBody(scale) {
        let deltaScale = scale / this.bodyScale;
        this.bodyScale = scale;
        Matter.Body.scale(this.body, deltaScale, deltaScale);
    }

    show() {
        Matter.Composite.add(this.game.phEngine.world, this.body);
    }

    hide() {
        Matter.Composite.remove(this.game.phEngine.world, this.body);
    }

}