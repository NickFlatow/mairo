import { Matrix } from "./math";
// import {tiles} from "./levels/interfaces"
interface tile {
    tile:{name:string},
    y1:number,
    y2:number
    x1:number,
    x2:number
}
export default class TileResolver {
    matrix:Matrix
    tileSize:number;
    constructor(matrix:Matrix, tileSize:number = 16){
        this.matrix = matrix;
        this.tileSize = tileSize
    }
    //returns tile number
    toIndex(pos:number):number{
        return Math.floor(pos/this.tileSize);
    }

    // this here:https://youtu.be/YLMP5jmtpYc
    toIndexRange(pos1:number,pos2:number){
        const pMax = Math.ceil(pos2 /this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);
        return range;
    }
    getByIndex(indexX:number,indexY:number):tile{
        const tile = this.matrix.get(indexX,indexY);
        //see this https://youtu.be/YLMP5jmtpYc?t=2482
        if (tile){
            //top of tile 
            const y1 = indexY * this.tileSize
            //bottom of tile
            const y2 = y1 +  this.tileSize;
            const x1 = indexX * this.tileSize
            //bottom of tile
            const x2 = x1 +  this.tileSize;
            return {tile,
                    y1,
                    y2,
                    x1,
                    x2};
        }
    
    }
    searchByPosition(posX:number,posY:number){
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)); 
    }
    searchByRange(x1:number,x2:number,y1:number,y2:number):tile[] {
        const macthes:tile[] = [];
        this.toIndexRange(x1,x2).forEach(indexX => {
            this.toIndexRange(y1,y2).forEach(indexY => {
                const match:tile = this.getByIndex(indexX,indexY);
                if(match){
                    macthes.push(match);
                }
            });
        });
        return macthes;
    }
}