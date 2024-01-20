class ThrowableObject extends MoveableObject {
    speedY = 30;
    speedX = 20;
    hasCollided;
    rotationInterval;

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 65;
        this.throw();
        this.animate();
        this.offset = {
            top: 10,
            right: 10,
            bottom: 20,
            left: 10
        };
    }

    throw() {
        this.speedY = 30;
        this.speedX = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 25;
        }, 60);
        this.playThrowSound();
    }

    animate() {
        this.rotationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 30);
    }

    animateBottleSplash() {
        clearInterval(this.rotationInterval); // Stoppt die Drehanimation
        this.speedX = 0;
        this.speedY = 0;
        this.applyGravity(false); // Deaktiviert die Schwerkraft, falls vorhanden
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH); 
    }

    playThrowSound() {
        let throwSound = new Audio('audio/bottle_throw.mp3');
        throwSound.play();
    }

}