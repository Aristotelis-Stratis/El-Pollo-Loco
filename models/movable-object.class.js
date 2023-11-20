class MoveableObject {
    x = 120;
    y = 365;
    height = 150;
    width = 100;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}