

export class Matrix{
    grid:{name:string}[][];
    constructor() {
        this.grid = [];
    }

    forEach(callback:(value:{name:string},x:number,y:number) => void )  {
        this.grid.forEach((column, x) => {
            column.forEach((value,y) => {
                callback(value,x,y);
            });
        });
    }
    get(x:number,y:number):{name:string}|undefined{
        const col:{name:string}[] = this.grid[x];
        if(col){
            return col[y];
        }
        return undefined;
    }

    set(x:number,y:number,value:{name:string}){
        if(!this.grid[x]){
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }
}

// window.Matrix = Matrix;

export class Vec2 {
    x:number
    y:number
    constructor(x:number,y:number){
        this.set(x,y);
    }
    set(x:number,y:number){
        this.x = x;
        this.y = y;
    }

}