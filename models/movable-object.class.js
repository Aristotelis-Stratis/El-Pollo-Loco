class MoveableObject {
    x = 120;
    y = 365;
    height = 150;
    width = 100;
    img;
    imageCache = {};    
    currentImage = 0;
    speed = 0.2;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}