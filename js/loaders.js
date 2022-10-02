// import {level}
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            // setTimeout(resolve,2000,image); 
            resolve(image);
        });
        image.src = url;
    });
}
export async function loadLevel(name) {
    return fetch(`./src/levels/${name}.json`)
        .then(r => r.json());
    // .then(json => new Promise(resolve => setTimeout(resolve,3000,json)))
    // })
}
