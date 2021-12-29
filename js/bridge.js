import {BridgePiece} from "./bridgePiece";
import Matter from "matter-js";
import {findDistance} from "./utils";

export class Bridge{
    constructor(x1, y1, x2, y2, pieceHeight, linkAmount, game, angle) {
        let realCoords1 = game.abstractToReal(x1, y1);
        let realCoords2 = game.abstractToReal(x2, y2);
        let pieceWidth =  findDistance(realCoords1.x, realCoords1.y, realCoords2.x, realCoords2.y) / linkAmount + 5;
        this.game = game;
        this.bodies = [];
        this.group = Matter.Body.nextGroup(true);

        this.compound = Matter.Composites.stack(realCoords1.x, realCoords1.y, linkAmount, 1, 0, 0, (x, y) => {
            let link = new BridgePiece(x, y, pieceWidth, pieceHeight, this.group, game);
            this.bodies.push(link.body);
            return link.body;
        });

        Matter.Composites.chain(this.compound, 0.3, 0, -0.3, 0, {stiffness: 0.5, length: 0} );

        this.constraint1 = Matter.Constraint.create({
            pointA: {x: realCoords1.x - (pieceWidth / 2), y: realCoords1.y},
            bodyB: this.bodies[0],
            pointB: {x: -(pieceWidth / 2), y: 0},
            length: 2,
            stiffness: 0.9,
        });

        this.constraint2 = Matter.Constraint.create({
            pointA: {x: x2 + (pieceWidth / 2), y: y2},
            bodyB: this.bodies[this.bodies.length-1],
            pointB: {x: pieceWidth / 2, y: 0},
            length: 2,
            stiffness: 0.9,
        });

    }

    show() {
        for (let obj of this.bodies) {
            obj.gameObject.show();
        }
        Matter.Composite.add(this.game.phEngine.world,
            [this.compound,
            this.constraint1,
            this.constraint2]);
    }

}