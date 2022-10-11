import { Entity } from "./Entity.js";
import { Matrix } from "./math.js";
import TileResolver from "./TileResolver.js";

// window.TileResolver = TileResolver
export default class TileCollider{
    tiles:TileResolver;
    constructor(tileMatrix:Matrix){
        this.tiles = new TileResolver(tileMatrix);
    }
    checkX(entity:Entity){
        let x:number;
        if(entity.vel.x > 0){
            x = entity.pos.x + entity.size.x;
        }else if (entity.vel.x < 0){
            x = entity.pos.x;
        } else {
            return
        }
        const matches = this.tiles.searchByRange(
            // entity.pos.x, entity.pos.x + entity.size.x,
            x,x,
            entity.pos.y, entity.pos.y + entity.size.y
            );
        matches.forEach(match => {
            if(match.tile.name !== 'ground'){
                return;
            }
            if(entity.vel.x > 0){
                if(entity.pos.x + entity.size.x > match.x1){
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            }
            else if(entity.vel.x < 0){
                if(entity.pos.x < match.x2){
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }
    checkY(entity:Entity){
        let y:number;
        if(entity.vel.y > 0){
            y = entity.pos.y + entity.size.y;
        }else if (entity.vel.y < 0){
            y = entity.pos.y;
        } else {
            return
        }
        const matches = this.tiles.searchByRange(
            entity.pos.x, entity.pos.x + entity.size.x,
            y,y
            // entity.pos.y, entity.pos.y + entity.size.y
            );
        matches.forEach(match => {
            if(match.tile.name !== 'ground'){
                return;
            }
            if(entity.vel.y > 0){
                if(entity.pos.y + entity.size.y > match.y1){
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            }
            else if(entity.vel.y < 0){
                if(entity.pos.y < match.y2){
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }

    test(entity:Entity){
        this.checkY(entity);
        // const match = this.tiles.searchByPosition(entity.pos.x,entity.pos.y);
        // if (match){
        //     console.log("Matched Tile",match,match.tile);
        // }
        // console.log("X: " + entity.pos.x, "Y: " + entity.pos.y);
    }
}
