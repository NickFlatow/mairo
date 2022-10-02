//span the height and width of canvas size defined in index.html
//x1,x2,y1,y2 is defined in levels json file -- ranges
export function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}
/**
 * 1.) reates buffer for background the size of cavase
 * 2.) creates buffer for each tiled background -- right now sky and ground
 * 3.) returns buffer from 1.) to be drawn in comp
 * @param backgrounds
 * @param sprites
 * @returns fucntion to draw background layers
 */
export function createBackground(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;
    backgrounds.forEach(background => {
        //draws on backgroundbuffer instead of directly to context(which shows on screeen)
        drawBackground(background, buffer.getContext('2d'), sprites);
    });
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}
export function createSpriteLayer(entity) {
    return function drawSpriteLayer(context) {
        entity.draw(context);
    };
}
