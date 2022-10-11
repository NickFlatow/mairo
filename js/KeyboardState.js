const PRESSED = 1;
const RELEASED = 0;
export class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();
        // Holds the callback functions for a key code 
        this.keyMap = new Map();
    }
    addMapping(key, callback) {
        this.keyMap.set(key, callback);
    }
    handleEvent(event) {
        //key is property of KeyboarEvent
        const { key } = event;
        if (!this.keyMap.has(key)) {
            //Did not have key mapped
            return;
        }
        //if we are here we know we have the key mapped
        //prevent event from happening in browser F5 refresh, pagedown moves pagedown etc...(none of this will now happen)
        event.preventDefault();
        //is keyState up or down
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        if (this.keyStates.get(key) === keyState) {
            return;
        }
        this.keyStates.set(key, keyState);
        // console.log(this.keyMap);
        //calls call back funciton and gives keyState as arguemtn
        this.keyMap.get(key)(keyState);
    }
    listenTo(window) {
        //add keyup and keydown to window listener
        ['keyup', 'keydown'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                // console.log(event);
                this.handleEvent(event);
            });
        });
    }
}
