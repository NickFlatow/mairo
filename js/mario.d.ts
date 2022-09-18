declare function loadImage(url: string): Promise<unknown>;
declare function loadLevel(name: string): Promise<any>;
declare const canvas: HTMLCanvasElement;
declare const context: CanvasRenderingContext2D;
declare function drawBackground(background: background, context: CanvasRenderingContext2D, sprites: SpriteSheet): void;
declare class SpriteSheet {
    image: CanvasImageSource;
    width: number;
    height: number;
    tiles: Map<string, HTMLCanvasElement>;
    constructor(image: HTMLImageElement, width: number, height: number);
    define(name: string, x: number, y: number): void;
    draw(name: string, context: CanvasRenderingContext2D, x: number, y: number): void;
    drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number): void;
}
interface background {
    ranges: number[];
    tile: string;
}
