/**
* Represents a cloud object that moves across the screen.
* Extends the MoveableObject class.
*/

class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 3000;
        this.animate();
    }


    /**
    * Animates the cloud's movement across the screen by periodically calling the moveLeft() method.
    * If the cloud moves completely off the screen to the left, it repositions it to the far right.
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                this.x = window.innerWidth + 3000;
            }
        }, 1000 / 60);
    }
}