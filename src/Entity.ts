abstract class Entity{
    pos:Vec2;
    velocity:Vec2;
    walkCycleIndex:number
    constructor(){
        this.pos = new Vec2(0,0);
        this.velocity = new Vec2(0,0);
        this.walkCycleIndex = 0;
    }

    abstract draw(context:CanvasRenderingContext2D):void
    abstract update(deltaTime:number):void

}