class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        // Erhöhen Sie diesen Wert, um die Startpositionen weiter zu streuen
        this.x = 0 + Math.random() * 3000; 
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x + this.width < 0) {
                // Erhöhen Sie diesen Wert, um den Wiedereintrittsabstand zu vergrößern
                this.x = window.innerWidth + 3000; 
            }
        }, 1000 / 60);
    }
}