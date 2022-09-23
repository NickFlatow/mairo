class Trait {
    name:string
    constructor(name:string){
        this.name = name;
    }

    update(_entity:Entity,_deltaTime:number){
        console.warn("Unhandled update call in trait")
    }
}
//traits are added in entites.ts


abstract class Entity{
    pos:Vec2;
    velocity:Vec2;
    traits:Trait[];

    constructor(){
        this.pos = new Vec2(0,0);
        this.velocity = new Vec2(0,0);

        this.traits = []
    }

    abstract draw(context:CanvasRenderingContext2D):void
    // abstract update(deltaTime:number):void

    addTrait(trait:Trait){
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime:number):void{
        this.traits.forEach(trait => {
            trait.update(this,deltaTime);
        });
    }

}