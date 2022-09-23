function createMario():Promise<Entity>{
    return loadMarioSprite().then(marioSprite =>{
        const mario = new Entity();

        mario.addTrait(new Velocity());
        mario.addTrait(new Jump());

        mario.draw = function drawMario(context:CanvasRenderingContext2D){
            // let arr = ['walk-1','walk-2','walk-3'];
            marioSprite.draw('idle',context,this.pos.x,this.pos.y);
        }
        return mario;
    });

}




    // const koopa = new Entity();
    // koopa.pos.set(250,240-56);