import { Vec2 } from "./math.js";
export class Trait {
    constructor(name) {
        this.name = name;
    }
    update(_entity, _deltaTime) {
        console.warn("Unhandled update call in trait");
    }
}
//traits are added in entites.ts
export class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.traits = [];
    }
    draw(_context) { }
    // abstract update(deltaTime:number):void
    addTrait(trait) {
        this.traits.push(trait);
        this[trait.name] = trait;
    }
    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        });
    }
}
