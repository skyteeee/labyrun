import Matter from "matter-js";

export class GameObject {
    constructor(physicalBody, game) {
        this.body = physicalBody;
        this.game = game;
        this.body.gameObject = this;
    }

    show() {
        Matter.Composite.add(this.game.phEngine.world, this.body);
    }

    hide() {
        Matter.Composite.remove(this.game.phEngine.world, this.body);
    }

}