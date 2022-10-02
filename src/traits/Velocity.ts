import { Trait,Entity } from "../Entity.js";

export class Velocity extends Trait {
    constructor(){
        super('velocity')
    }

    update(entity:Entity,deltaTime:number):void{
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    }
    
}