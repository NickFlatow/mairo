export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }
    //returns tile number
    toIndex(pos) {
        return Math.floor(pos / this.tileSize);
    }
    // this here:https://youtu.be/YLMP5jmtpYc
    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);
        return range;
    }
    getByIndex(indexX, indexY) {
        const tile = this.matrix.get(indexX, indexY);
        //see this https://youtu.be/YLMP5jmtpYc?t=2482
        if (tile) {
            //top of tile 
            const y1 = indexY * this.tileSize;
            //bottom of tile
            const y2 = y1 + this.tileSize;
            const x1 = indexX * this.tileSize;
            //bottom of tile
            const x2 = x1 + this.tileSize;
            return { tile,
                y1,
                y2,
                x1,
                x2 };
        }
    }
    searchByPosition(posX, posY) {
        return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
    }
    searchByRange(x1, x2, y1, y2) {
        const macthes = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    macthes.push(match);
                }
            });
        });
        return macthes;
    }
}
