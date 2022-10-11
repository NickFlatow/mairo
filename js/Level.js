import { Compositor } from "./Compositor.js";
import { Matrix } from "./math.js";
import TileCollider from "./TileCollider.js";
export default class Level {
    constructor() {
        this.gravity = 2000;
        this.comp = new Compositor();
        this.entites = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }
    addEntity(entity) {
        this.entites.add(entity);
    }
    update(detlaTime) {
        this.entites.forEach(entity => {
            entity.update(detlaTime);
            entity.pos.x += entity.vel.x * detlaTime;
            this.tileCollider.checkX(entity);
            entity.pos.y += entity.vel.y * detlaTime;
            this.tileCollider.checkY(entity);
            entity.vel.y += this.gravity * detlaTime;
        });
    }
}
