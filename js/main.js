import {Game} from "./game";
import TWEEN from "@tweenjs/tween.js";
import css from '../css/game.css'


function init () {
    game.init();
}

function onResize() {
    game.resize();
}

window.onload = init;

let game = new Game();
window.game = game;
window.TWEEN = TWEEN;
