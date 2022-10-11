import { Trait } from "../Entity.js";
export class Run extends Trait {
    constructor() {
        super('run');
        this.dir = 0;
        this.speed = 6000;
    }
    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
}
