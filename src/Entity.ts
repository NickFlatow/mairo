import { Vec2 } from "./math.js";
import { Jump } from "./traits/Jump.js";
import { Run } from "./traits/Run.js"

export class Trait {
    name:string
    constructor(name:string){
        this.name = name;
    }

    update(_entity:Entity,_deltaTime:number){
        console.warn("Unhandled update call in trait")
    }
}
//traits are added in entites.ts


export class Entity{
    pos:Vec2;
    vel:Vec2;
    size:Vec2;
    traits:Trait[];
    jump:Jump;
    run:Run;

    constructor(){
        this.pos = new Vec2(0,0);
        this.vel = new Vec2(0,0);
        this.size = new Vec2(0,0);
        this.traits = []
    }

    draw(_context:CanvasRenderingContext2D):void{}
    // abstract update(deltaTime:number):void

    addTrait(trait:Trait){
        this.traits.push(trait);
        this[trait.name] = trait;
    }
 
    update(deltaTime:number):void{
        this.traits.forEach(trait => {
            trait.update(this,deltaTime);
        });
    }
}