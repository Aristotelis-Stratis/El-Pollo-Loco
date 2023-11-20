class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;
    speed = 0.2; // Geschwindigkeit der Wolkenbewegung

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x + this.width < 0) {
                this.x = window.innerWidth + Math.random() * 500;
            }
        }, 1000 / 60);
    }
}