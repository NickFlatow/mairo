function createMario():Promise<Entity>{
    return loadMarioSprite().then(marioSprite =>{
        const mario = new Entity();


        mario.draw = function drawMario(context:CanvasRenderingContext2D){
            // let arr = ['walk-1','walk-2','walk-3'];
            marioSprite.draw('idle',context,this.pos.x,this.pos.y);
        }
        mario.update = function update(deltaTime:number){
            this.pos.x += this.velocity.x * deltaTime;
            this.pos.y += this.velocity.y * deltaTime;

        }
        return mario;
    });

}


    // const koopa = new Entity();
    // koopa.pos.set(250,240-56);