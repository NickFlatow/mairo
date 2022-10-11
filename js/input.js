import { KeyboardState } from "./KeyboardState.js";
export function setupKeyboard(entity) {
    let input = new KeyboardState();
    input.addMapping("ArrowUp", keyState => {
        // console.log(keyState);
        if (keyState) {
            entity.jump.start();
        }
        else {
            entity.jump.cancel();
        }
    });
    input.addMapping("ArrowRight", keyState => {
        entity.run.dir = keyState;
    });
    input.addMapping("ArrowLeft", keyState => {
        entity.run.dir = -keyState;
    });
    return input;
}
