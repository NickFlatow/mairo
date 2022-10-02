import { loadMarioSprite } from "./sprites.js";
import { Entity } from "./Entity.js";
import { Velocity } from "./traits/Velocity.js";
import { Jump } from "./traits/Jump.js";
export function createMario() {
    return loadMarioSprite().then(marioSprite => {
        const mario = new Entity();
        mario.addTrait(new Velocity());
        mario.addTrait(new Jump());
        mario.draw = function drawMario(context) {
            // let arr = ['walk-1','walk-2','walk-3'];
            marioSprite.draw('idle', context, this.pos.x, this.pos.y);
        };
        return mario;
    });
}
// const koopa = new Entity();
// koopa.pos.set(250,240-56);
