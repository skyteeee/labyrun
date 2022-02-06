import {BridgePiece} from "./bridgePiece";
import Matter from "matter-js";
import {findDistance} from "./utils";

export class Bridge{
    constructor(x1, y1, x2, y2, pieceHeight, linkAmount, game) {
        let rateOfChange = (y2 - y1) / (x2 - x1);
        let pieceWidth =  findDistance(x1, y1, x2, y2) / linkAmount / 0.9;
        let constraintLength = 2;
        this.game = game;
        this.bodies = [];
        this.group = Matter.Body.nextGroup(true);

        this.compound = Matter.Composites.stack(x1, y1, linkAmount, 1, 0, 0, (x, y) => {
            let link = new BridgePiece(x, y, pieceWidth, pieceHeight, this.group, game);
            this.bodies.push(link.body);
            return link.body;
        });

        Matter.Composites.chain(this.compound, 0.45, 0, -0.45, 0, {stiffness: 0.5, length: 0} );

        let myX = (constraintLength / Math.sqrt(rateOfChange**2 + 1));

        this.constraint1 = Matter.Constraint.create({
            pointA: {x: x1 - myX, y: y1 - myX * rateOfChange},
            bodyB: this.bodies[0],
            pointB: {x: -(pieceWidth / 2), y: 0},
            length: constraintLength,
            stiffness: 0.5,
        });

        this.constraint2 = Matter.Constraint.create({
            pointA: {x: x2 + myX, y: y2 + myX * rateOfChange},
            bodyB: this.bodies[this.bodies.length-1],
            pointB: {x: pieceWidth / 2, y: 0},
            length: constraintLength,
            stiffness: 0.5,
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