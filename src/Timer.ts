class Timer {
    constructor(deltaTime = 1/60){
        // const deltaTime = 1/60;
        let accumulatedTime = 0;
        let lastTime = 0;
        
        this.updateProxy = (time:number) => {
            //accumlatedTime and delta time to get the same results for macheines with different refresh rate for consistancey with movement and jumps; 
            //Also to control fps different parts of the game if needed 
            accumulatedTime += (time - lastTime) /1000;
           
            while (accumulatedTime > deltaTime){
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
    
            }
            lastTime = time;
            this.enqueue();
        }
    }

    enqueue(){
        requestAnimationFrame(this.updateProxy);    
    }

    start() {
        this.enqueue();
    }

    update(_deltaTime:number){}
    updateProxy(_time:number){}

}