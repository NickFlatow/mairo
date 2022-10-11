import { createMario } from "./entities.js";
import { loadLevel } from "./loaders.js";
import { setupKeyboard } from "./input.js";
import { Timer } from "./Timer.js";
import { createCollisionLayer } from "./layers.js";
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
//load level and sprites in parallel -- do not wait for backgroundsprites to finish before starting loadlevel
//but do not continue until all have finished loading
Promise.all([
    createMario(),
    loadLevel('1-1')
]).then(([mario, level]) => {
    mario.pos.set(16, 0);
    level.addEntity(mario);
    level.comp.layers.push(createCollisionLayer(level));
    const input = setupKeyboard(mario);
    input.listenTo(window);
    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        });
    });
    //create class to call draw methods on background layers
    // const comp = new Compositor();
    // comp.layers.push(koopa);
    const timer = new Timer(1 / 60); // 1/60 is frame length
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context);
    };
    timer.start();
});
