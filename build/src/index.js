"use strict";
var hero = {
    left: window.innerWidth / 2
};
var missiles = [];
var enemies = [
    { left: 200, top: 100 },
    { left: 300, top: 100 },
    { left: 400, top: 100 },
    { left: 500, top: 100 },
    { left: 600, top: 100 },
    { left: 700, top: 100 },
    { left: 800, top: 100 },
    { left: 900, top: 100 },
    { left: 200, top: 175 },
    { left: 300, top: 175 },
    { left: 400, top: 175 },
    { left: 500, top: 175 },
    { left: 600, top: 175 },
    { left: 700, top: 175 },
    { left: 800, top: 175 },
    { left: 900, top: 175 }
];
document.onkeydown = function (e) {
    if (e.keyCode === 37) {
        hero.left = hero.left - 20;
        moveHero();
    }
    else if (e.keyCode === 39) {
        hero.left = hero.left + 20;
        moveHero();
    }
};
function moveHero() {
    document.getElementById("hero").style.left = hero.left + "px";
}
