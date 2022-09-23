class Velocity extends Trait {
    constructor(){
        super('velocity')
    }

    update(entity:Entity,deltaTime:number):void{
        entity.pos.x += entity.velocity.x * deltaTime;
        entity.pos.y += entity.velocity.y * deltaTime;
    }
    
}