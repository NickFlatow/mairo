import { Trait,Entity } from "../Entity.js";

export class Jump extends Trait {
    duration:number;
    velocity:number;
    engageTime:number;
    constructor(){
        super('jump');
        //how long we can hold the button
        this.duration = 0.5;
        this.velocity = 200;

        //are we currently jumping
        this.engageTime = 0
    }
    update(entity:Entity,deltaTime:number):void{
        if(this.engageTime > 0){
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
    start(){
        this.engageTime = this.duration;
        // console.log("started Jump");
    }
    cancel(){
        this.engageTime = 0;
        // console.log("canceled jump");
    }
    
}