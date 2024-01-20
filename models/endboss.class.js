class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    isDead = false;
    hadFirstContact = false;
    alertAnimationPlayed = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    alert_sound = new Audio('audio/boss_intro_sound.mp3');
    hurt_sound = new Audio('audio/chicken_hurt.mp3');
    dead_sound = new Audio('audio/boss_dead.mp3');

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000;
        this.speed = 12 + Math.random() * 1.2;
        this.offset = { top: 60, right: 20, bottom: 90, left: 20 };
        this.animate();
    }


    animate() {
        const animationInterval = setInterval(() => {
            if (this.shouldStartAlert()) {
                this.startAlertAnimation(animationInterval);
            }
        }, 120);
    }


    shouldStartAlert() {
        return world && world.character.x > 4500 && !this.hadFirstContact;
    }


    startAlertAnimation(interval) {
        if (!this.alertAnimationPlayed) {
            this.alert_sound.play();
            this.alertAnimationInterval = this.startAnimationInterval(this.IMAGES_ALERT, 275, () => {
                clearInterval(this.alertAnimationInterval);
                this.alertAnimationPlayed = true;
                setTimeout(() => {
                    this.hadFirstContact = true;
                    this.startWalking();
                }, 1000);
            });
            clearInterval(interval);
        }
    }


    startHurtAnimation() {
        if (!this.hurtAnimationInterval) {
            this.stopMovement();
            this.hurt_sound.play();
            this.hurtAnimationInterval = this.startAnimationInterval(this.IMAGES_HURT, 300, () => {
                this.resetToWalkingState();
            });
        }
    }


    startWalking() {
        const walkingInterval = setInterval(() => {
            if (this.energy > 0 && !this.isDead) {
                this.updateSpeed();
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.bossIsDead()) {
                clearInterval(walkingInterval);
            }
        }, 120);
    }


    updateSpeed() {
        if (this.energy < 60) {
            this.speed = 24 + Math.random() * 1.2;
        } else {
            this.speed;
        }
    }


    bossIsHit() {
        this.reduceEnergy();
        this.startHurtAnimation();
        this.updateHealthBar();
    }


    reduceEnergy() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }


    resetToWalkingState() {
        clearInterval(this.hurtAnimationInterval);
        this.hurtAnimationInterval = null;
        this.playAnimation(this.IMAGES_WALKING);
        this.resumeMovementAfterDelay(0.1);
    }


    stopMovement() {
        this.speed = 0;
    }


    resumeMovementAfterDelay(delay) {
        setTimeout(() => {
            this.speed = 6.15 + Math.random() * 1.2;
        }, delay * 1000);
    }


    bossIsDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            this.stopAllAnimations();
            this.dead_sound.play();
            this.startDeathAnimation();
            setTimeout(() => {
                showEndScreen();
              }, 300);
        }
        this.updateHealthBar();
    }


    stopAllAnimations() {
        clearInterval(this.hurtAnimationInterval);
        this.stopMovement();
    }


    startDeathAnimation() {
        this.deathAnimationInterval = this.startAnimationInterval(this.IMAGES_DEAD, 180, () => {
            this.endDeathAnimation();
        });
    }


    endDeathAnimation() {
        clearInterval(this.deathAnimationInterval);
        this.deathAnimationInterval = null;
        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
    }


    updateHealthBar() {
        world.endbossHealthbar.setPercentage(this.energy);
    }

    
    startAnimationInterval(images, intervalTime, onComplete = null) {
        let animationCounter = 0;
        const animationLength = images.length;
        return setInterval(() => {
            this.playAnimation(images);
            animationCounter++;
            if (animationCounter / animationLength >= 1) {
                clearInterval(this.deathAnimationInterval);
                if (onComplete) onComplete();
            }
        }, intervalTime);
    }
}
