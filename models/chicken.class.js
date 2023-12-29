class Chicken extends MoveableObject {
    y = 350;
    height = 80;
    width = 70;
    energy = 1;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 300 + Math.random() * 2400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.offset = {
            top: 60,
            right: 120,
            bottom: 130,
            left: 60
        };
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);


        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 120);
    }
}