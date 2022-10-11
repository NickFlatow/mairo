import { Trait,Entity } from "../Entity.js";

export class Run extends Trait {

    dir:number;
    speed:number;
    constructor(){
        super('run');

        this.dir = 0;
        this.speed = 6000;
    }
    update(entity:Entity,deltaTime:number):void{
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
    
}