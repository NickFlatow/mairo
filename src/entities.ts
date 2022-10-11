import { loadMarioSprite } from "./sprites.js";
import { Entity } from "./Entity.js";
// import { Velocity} from "./traits/Velocity.js";
import { Jump } from "./traits/Jump.js";
import { Run } from "./traits/Run.js";


export function createMario():Promise<Entity>{
    return loadMarioSprite().then(marioSprite =>{
        const mario = new Entity();
        mario.size.set(16,16);

        mario.addTrait(new Jump());
        mario.addTrait(new Run());
        // mario.addTrait(new Velocity());

        mario.draw = function drawMario(context:CanvasRenderingContext2D){
            // let arr = ['walk-1','walk-2','walk-3'];
            marioSprite.draw('idle',context,this.pos.x,this.pos.y);
        }
        return mario;
    });

}




    // const koopa = new Entity();
    // koopa.pos.set(250,240-56);