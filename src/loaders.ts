function loadImage(url:string){
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}
async function loadLevel(name:string){
    let level = await fetch(`./src/levels/${name}.json`);
    return await level.json();
    // })
}