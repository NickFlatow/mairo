/**
 * 1.) reates buffer for background the size of cavase
 * 2.) creates buffer for each tiled background -- right now sky and ground
 * 3.) returns buffer from 1.) to be drawn in comp
 * @param backgrounds
 * @param sprites
 * @returns fucntion to draw background layers
 */
export function createBackground(level, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    const context = buffer.getContext('2d');
    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, context, x, y);
    });
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
export function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.forEach(entity => {
            entity.draw(context);
        });
    };
}
export function createCollisionLayer(level) {
    const resolvedTiles = [];
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;
    //save original function
    const getByIndexOriginal = tileResolver.getByIndex;
    //override orignial function
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        //space do stuff while spying on the original function
        // console.log("test");
        resolvedTiles.push({ x, y });
        //.call sends "this" to the function "this" is tileResolver here 
        return getByIndexOriginal.call(tileResolver, x, y);
    };
    return function drawCollision(context) {
        context.strokeStyle = 'blue';
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
            context.stroke();
        });
        context.strokeStyle = 'red';
        level.entites.forEach(entity => {
            context.beginPath();
            context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
            context.stroke();
        });
        resolvedTiles.length = 0;
    };
}
