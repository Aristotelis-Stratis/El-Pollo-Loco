class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    isDead = false;
    hadFirstContact = false;
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

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 3250;
        this.speed = 6.15 + Math.random() * 1.2;
        this.offset = {
            top: 60,
            right: 20,
            bottom: 90,
            left: 20
        };
    }

    animate() {
        let i = 0;
        setInterval(() => {
            if (world && world.character.x > 3100) {
                console.log(i);
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.bossIsAngry()) {
                // this.hurt_sound.play(); //BOSS HURT SOUND 
            } else (this.bossIsDead())
            i++;

            if (!this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 120);
    }


    // ENDBOSS AN DIE POSITION BRINGEN
    // COINS IN PARABELFORM FÜRS LEVEL BRINGEN
    // FLASCHEN BESSER VERTEILEN
    // JUMP() + JumpCollision() auf enemies
    // removeEnemyFromCanvas
    // Anpassen das HP nicht so schnell reduziert wird bei Collision
    // End-Screen
    // Restart Button
    // Mobile + Knöpfe
    // Finishing up


    bossIsAngry() {
        if (this.energy > 0) {
            setInterval(() => {
                this.playAnimation(this.IMAGES_ATTACK);
            }, 400);
        }
    }
    bossIsHit() {
        this.reduceEnergy();
        this.startHurtAnimation();
        world.endbossHealthbar.setPercentage(this.energy);
    }
    
    reduceEnergy() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
            // Logik für das Sterben des Endbosses
        }
    }
    
    startHurtAnimation() {
        if (!this.hurtAnimationInterval) {
            this.stopMovement();
            let hurtAnimationCounter = 0;
            const hurtAnimationLength = this.IMAGES_HURT.length;
    
            this.hurtAnimationInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_HURT);
                hurtAnimationCounter++;
    
                if (hurtAnimationCounter / hurtAnimationLength >= 1) {
                    clearInterval(this.hurtAnimationInterval);
                    this.hurtAnimationInterval = null;
                    this.playAnimation(this.IMAGES_WALKING);
                    this.resumeMovementAfterDelay(0.1); // 0.25 Sekunden warten
                }
            }, 180);
        }
    }
    
    stopMovement() {
        this.speed = 0;
    }
    
    resumeMovementAfterDelay(delay) {
        setTimeout(() => {
            this.speed = 6.15 + Math.random() * 1.2;
        }, delay);
    }
    
    

    // Vergessen Sie nicht, das Intervall zu löschen, wenn der Endboss stirbt oder wenn die Animation nicht mehr benötigt wird
    bossIsDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            this.stopAllAnimations();
            this.startDeathAnimation();
        }
        world.endbossHealthbar.setPercentage(this.energy);
    }
    
    stopAllAnimations() {
        clearInterval(this.hurtAnimationInterval);
        this.stopMovement();
    }
    
    startDeathAnimation() {
        let deathAnimationCounter = 0;
        const deathAnimationLength = this.IMAGES_DEAD.length;
    
        this.deathAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            deathAnimationCounter++;
    
            if (deathAnimationCounter / deathAnimationLength >= 1) {
                clearInterval(this.deathAnimationInterval);
                this.deathAnimationInterval = null;
                this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
            }
        }, 180);
    }
    

}
