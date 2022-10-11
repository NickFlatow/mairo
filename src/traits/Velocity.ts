import { Trait,Entity } from "../Entity.js";


//increases position set by velocity relative to the frame rate set by deltaTime
//velocity is set elsewhere in the system. Ex: in run Trait, in main.ts update loop due to gravity
export class Velocity extends Trait {
    constructor(){
        super('velocity')
    }

    update(entity:Entity,deltaTime:number):void{
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
    
}