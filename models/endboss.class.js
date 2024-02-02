class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 120;
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
        'img/4_enemie_boss_chicken/5_dead/G26.png'
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
        this.speed = 18;
        this.offset = { top: 60, right: 20, bottom: 90, left: 20 };
        this.animationIntervals = [];
        this.animate();
    }


    /**
     * Animate the endboss's behavior, including starting an alert animation.
     */
    animate() {
        const animationInterval = setInterval(() => {
            if (this.shouldStartAlert()) {
                this.startAlertAnimation(animationInterval);
            }
        }, 120);
        this.animationIntervals.push(animationInterval);

        addInterval(animationInterval);
    }


    /**
     * Checks if the alert animation should start based on specific conditions.
     *
     * @returns {boolean} True if the alert animation should start, false otherwise.
     */
    shouldStartAlert() {
        return world && world.character.x > 4500 && !this.hadFirstContact;
    }


    /**
     * Start the alert animation for the endboss character.
     *
     * @param {number} interval - The interval at which to check for starting the alert animation.
     */
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


    /**
     * Start the hurt animation for the endboss character.
     * This animation occurs when the endboss is hit.
     */
    startHurtAnimation() {
        if (!this.hurtAnimationInterval) {
            this.stopMovement();
            this.hurt_sound.play();
            this.hurtAnimationInterval = this.startAnimationInterval(this.IMAGES_HURT, 300, () => {
                this.resetToWalkingState();
            });
        }
    }


    /**
    * Start the walking behavior for the endboss character.
    * The endboss will move left while alive and not dead.
    */
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


    /**
     * Update the endboss's speed based on its energy level.
     * Lower energy results in increased speed variation.
     */
    updateSpeed() {
        if (this.energy < 60) {
            this.speed = 24 + Math.random() * 1.2;
        } else {
            this.speed;
        }
    }


    /**
     * Handle when the endboss is hit.
     * Reduces the endboss's energy, starts the hurt animation, and updates the health bar.
     */
    bossIsHit() {
        this.reduceEnergy();
        this.startHurtAnimation();
        this.updateHealthBar();
    }


    /**
     * Reduce the endboss's energy by 10 and ensure it doesn't go below 0.
     */
    reduceEnergy() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }


    /**
     * Reset the endboss to its walking state after the hurt animation.
     */
    resetToWalkingState() {
        clearInterval(this.hurtAnimationInterval);
        this.hurtAnimationInterval = null;
        this.playAnimation(this.IMAGES_WALKING);
        this.resumeMovementAfterDelay(0.05);
    }


    /**
     * Stop the endboss's movement by setting its speed to 0.
     */
    stopMovement() {
        this.speed = 0;
    }


    /**
     * Resume the endboss's movement after a specified delay.
     * Adjusts the endboss's speed based on energy.
     *
     * @param {number} delay - The delay in seconds before resuming movement.
     */
    resumeMovementAfterDelay(delay) {
        setTimeout(() => {
            this.speed = 16 + Math.random() * 1.2;
        }, delay * 1000);
    }


    /**
     * Check if the endboss is dead based on its energy level.
     * If the energy is zero or below and the endboss is not already dead,
     * initiate the death process.
     */
    bossIsDead() {
        if (this.energy <= 0 && !this.isDead) {
            this.isDead = true;
            this.stopAllAnimations();
            this.dead_sound.play();
            this.startDeathAnimation();
            setTimeout(() => {
                showEndScreen();
            }, 1000);
            this.clearIntervals();
        }
    }


    /**
     * Clear all animation intervals associated with the endboss.
     */
    clearIntervals() {
        this.animationIntervals.forEach(interval => clearInterval(interval));
        this.animationIntervals = [];
        this.animationIntervals.forEach(interval => {
            const index = intervals.indexOf(interval);
            if (index !== -1) {
                intervals.splice(index, 1);
            }
        });
    }

    /**
     * Stop all animations for the endboss, including hurt animation and movement.
     */
    stopAllAnimations() {
        clearInterval(this.hurtAnimationInterval);
        this.stopMovement();
    }


    /**
     * Start the death animation for the endboss.
     */
    startDeathAnimation() {
        this.deathAnimationInterval = this.startAnimationInterval(this.IMAGES_DEAD, 250, () => {
            this.endDeathAnimation();
        });
    }


    /**
     * End the death animation for the endboss and load the final image.
     */
    endDeathAnimation() {
        clearInterval(this.deathAnimationInterval);
        this.deathAnimationInterval = null;
        this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
    }

    /**
     * Update the health bar of the endboss in the game world.
     */
    updateHealthBar() {
        world.endbossHealthbar.setPercentage(this.energy);
    }


    /**
     * Start an animation interval for a set of images.
     * This function plays the animation and triggers the onComplete callback when finished.
     *
     * @param {Array<string>} images - Array of image paths for the animation frames.
     * @param {number} intervalTime - The time interval between each frame in milliseconds.
     * @param {function|null} onComplete - Callback function to execute when the animation is complete.
     * @returns {number} - The ID of the animation interval.
     */
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
