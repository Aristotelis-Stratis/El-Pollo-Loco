let requestAnimationFrameId = 0;

/**
 * Represents the game world where characters and objects interact.
 * @class
 */
class World {
    character = new Character();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
    statusBar = new Statusbar();
    throwableObjects = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    collectedCoins = 0;
    DKeyPressed = false;
    showEndbossHealthbar = false;
    gameOver = false;
    canThrowBottle = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the reference to the game world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop that checks for collisions.
     */
    run() {
        setInterval(() => {
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkCollisions();
            this.checkBottleHitEndbossCollisions();
        }, 10);
    }

    checkCollisions() {
        this.checkCollisionsWithEnemies();
        this.checkCollisionWithEndboss();
    }

    /**
     * Checks collisions of the character with enemies.
     */
    checkCollisionsWithEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && enemy.energy > 0) {
                if (this.character.isAboveGround() && this.character.speedY < 0) {
                    this.handleCollisionAboveGround(enemy);
                } else if (this.character.energy > 0) {
                    this.handleCollision();
                }
            }
        });
        this.checkBottleEnemyCollisions();
    }

    /**
     * Checks collisions between throwable objects (bottles) and enemies.
     */
    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (!bottle.hasCollided && enemy.energy > 0 && enemy.isColliding(bottle)) {
                    this.handleBottleEnemyCollision(bottle, bottleIndex, enemy);
                }
            });
        });
    }

    /**
     * Handles the collision between a bottle and an enemy.
     */
    handleBottleEnemyCollision(bottle, bottleIndex, enemy) {
        bottle.hasCollided = true;
        enemy.energy--;
        this.playEnemyDeathAnimation(enemy);
        this.playBottleShatterSound();
        bottle.animateBottleSplash();
        this.removeBottleAndEnemyAfterCollision(bottleIndex, enemy);
    }

    /**
     * Plays the death animation for an enemy if its energy reaches zero.
     */
    playEnemyDeathAnimation(enemy) {
        if (enemy.energy === 0) {
            enemy.playDeathAnimation();
        }
    }

    /**
     * Removes the bottle and enemy after a collision.
     */
    removeBottleAndEnemyAfterCollision(bottleIndex, enemy) {
        if (enemy.energy === 0) {
            setTimeout(() => {
                this.removeEnemyFromLevel(enemy);
            }, 500);
        }
        setTimeout(() => {
            this.removeBottleAfterCollision(bottleIndex);
        }, 1000);
    }

    /**
     * Checks collision between the character and an endboss.
     */
    checkCollisionWithEndboss() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            this.level.endboss.forEach(boss => {
                if (this.character.isColliding(boss)) {
                    this.handleCollision();
                }
            });
        }
    }

    /**
     * Checks collisions between the character and coins, updates collected coins, and plays a sound.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                if (!isGameMuted) {
                    this.playGameSound('audio/coin.mp3', 0.1);
                }
                coin.stopAnimation();
            }
        });
    }

    /**
     * Checks collisions between the character and bottles, updates collected bottles, and plays a sound.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles + 1);
                if (!isGameMuted) {
                    this.playGameSound('audio/bottle_collect.mp3', 1);
                }
            }
        });
    }

    /**
     * Checks if the character can throw a bottle and adds a throwable object to the game.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.canThrowBottle && this.bottleBar.collectedBottles > 0 && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles - 1);
            this.canThrowBottle = false;
            setTimeout(() => {
                this.canThrowBottle = true;
            }, 650);
        }
    }

    /**
     * Checks collisions between throwable objects (bottles) and the endboss.
     */
    checkBottleHitEndbossCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.isBottleCollidingWithEndboss(bottle)) {
                this.handleBottleEndbossCollision(bottle, index);
            }
        });
    }

    /**
     * Checks if a bottle is colliding with the endboss.
     * @param {ThrowableObject} bottle - The throwable object (bottle) to check for collision.
     */
    isBottleCollidingWithEndboss(bottle) {
        return !bottle.hasCollided && this.level.endboss[0].isColliding(bottle);
    }

    /**
     * Handles the collision between a bottle and the end boss.
     * @param {ThrowableObject} bottle - The bottle that collided with the end boss.
     * @param {number} index - The index of the bottle in the throwable objects array.
     */
    handleBottleEndbossCollision(bottle, index) {
        bottle.hasCollided = true;
        this.level.endboss[0].bossIsHit();
        this.playBottleShatterSound();
        bottle.animateBottleSplash();
        setTimeout(() => {
            this.removeBottleAfterCollision(index);
        }, 1000);
    }

    /**
     * Removes a bottle from the throwable objects array after a collision.
     * @param {number} index - The index of the bottle to remove from the array.
     */
    removeBottleAfterCollision(index) {
        this.throwableObjects.splice(index, 1);
    }

    /**
     * Handles collisions between the character and enemies or end boss, reducing character's energy and updating the status bar.
     */
    handleCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }

    /**
     * Handles the collision between the character and an enemy above the ground.
     * @param {Enemy} enemy - The enemy with which the character collided.
     */
    handleCollisionAboveGround(enemy) {
        enemy.energy--;
        this.character.jump();
        if (enemy.energy === 0) {
            enemy.playDeathAnimation();
            setTimeout(() => {
                this.removeEnemyFromLevel(enemy);
            }, 500);
        }
    }

    /**
     * Removes an enemy from the level.
     * @param {Enemy} enemy - The enemy to remove from the level.
     */
    removeEnemyFromLevel(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }

    /**
     * Checks if the endboss is defeated.
     */
    isEndbossDefeated() {
        return this.level.endboss[0] && this.level.endboss[0].isDead;
    }

    /**
     * Checks if the character is dead (out of energy).
     */
    isCharacterDead() {
        return this.character && this.character.energy <= 0;
    }

    /**
     * Ends the game by setting the game over state, resetting collected bottles, clearing throwable objects and displaying the end screen.
     */
    endGame() {
        if (!this.gameOver) {
            this.gameOver = true;
            this.bottleBar.setCollectedBottles(0);
            this.throwableObjects = [];
            showEndScreen();
        }
    }

    /**
     * Draws the entire game including background, characters, UI, and game objects.
     */
    draw() {
        if (!gameActive) return;
        this.clearCanvas();
        this.drawBackground();
        this.drawMainCharacter();
        this.drawUI();
        this.drawGameObjects();
        requestAnimationFrameId = requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears the canvas by erasing its contents.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background of the game world, including background objects.
     */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the main character on the game screen.
     */
    drawMainCharacter() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the user interface (UI) elements such as the status bar, bottle bar, coin bar, and endboss health bar.
     */
    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.updateEndbossHealthbarVisibility();
        if (this.showEndbossHealthbar) {
            this.addToMap(this.endbossHealthbar);
        }
    }

    /**
     * Updates the visibility of the endboss health bar based on the character's position in the game world.
     */
    updateEndbossHealthbarVisibility() {
        if (this.character.x > 4500) {
            this.showEndbossHealthbar = true;
        }
    }

    /**
     * Draws various game objects including enemies, coins, endboss, bottles, clouds, and throwable objects.
     */
    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds multiple objects to the game map for drawing.
     * @param {Object[]} objects - An array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Adds a single object to the game map for drawing and handles flipping the image if needed.
     * @param {DrawableObject} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally for a given drawable object and adjusts its position.
     * @param {DrawableObject} mo - The object for which the image is flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after being flipped.
     * @param {DrawableObject} mo - The object for which the image is restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Plays a game sound with the given file path and optional volume.
     * @param {string} soundFilePath - The file path of the sound to be played.
     * @param {number} [volume=0.2] - The volume level of the sound (default is 0.2).
     */
    playGameSound(soundFilePath, volume = 0.2) {
        let gameSound = new Audio(soundFilePath);
        gameSound.volume = volume;
        gameSound.play();
    }

    /**
     * Plays the bottle shatter sound effect if the game is not muted.
     */
    playBottleShatterSound() {
        if (!isGameMuted) {
            this.playGameSound('audio/bottle_shatter.mp3');
        }
    }
}