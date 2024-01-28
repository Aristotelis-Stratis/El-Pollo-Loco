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


    setWorld() {
        this.character.world = this;
    }


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
    
    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (!bottle.hasCollided && enemy.energy > 0 && enemy.isColliding(bottle)) {
                    this.handleBottleEnemyCollision(bottle, bottleIndex, enemy);
                }
            });
        });
    }
    

    handleBottleEnemyCollision(bottle, bottleIndex, enemy) {
        bottle.hasCollided = true;
        enemy.energy--;
        
        this.playEnemyDeathAnimation(enemy);
        this.playBottleShatterSound();
        bottle.animateBottleSplash();
        this.removeBottleAndEnemyAfterCollision(bottleIndex, enemy);
    }
    

    playEnemyDeathAnimation(enemy) {
        if (enemy.energy === 0) {
            enemy.playDeathAnimation();
        }
    }

    
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

    
    checkCollisionWithEndboss() {
        if (this.level.endboss && this.level.endboss.length > 0) {
            this.level.endboss.forEach(boss => {
                if (this.character.isColliding(boss)) {
                    this.handleCollision();
                }
            });
        }
    }


    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                this.playGameSound('audio/coin.mp3', 0.1);
                coin.stopAnimation();
            }
        });
    }


    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles + 1);
                this.playGameSound('audio/bottle_collect.mp3', 1);
            }
        });
    }


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


    checkBottleHitEndbossCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            if (this.isBottleCollidingWithEndboss(bottle)) {
                this.handleBottleEndbossCollision(bottle, index);
            }
        });
    }


    isBottleCollidingWithEndboss(bottle) {
        return !bottle.hasCollided && this.level.endboss[0].isColliding(bottle);
    }


    handleBottleEndbossCollision(bottle, index) {
        bottle.hasCollided = true;
        this.level.endboss[0].bossIsHit();
        this.playBottleShatterSound();
        bottle.animateBottleSplash();
        setTimeout(() => {
            this.removeBottleAfterCollision(index);
        }, 1000);
    }


    removeBottleAfterCollision(index) {
        this.throwableObjects.splice(index, 1);
    }


    handleCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
    }


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


    removeEnemyFromLevel(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }


    isEndbossDefeated() {
        return this.level.endboss[0] && this.level.endboss[0].isDead;
    }


    isCharacterDead() {
        return this.character && this.character.energy <= 0;
    }


    endGame() {
        if (!this.gameOver) {
            this.gameOver = true;
            showEndScreen();
        }
    }


    draw() {
        if (!gameActive) return;
        this.clearCanvas();
        this.drawBackground();
        this.drawMainCharacter();
        this.drawUI();
        this.drawGameObjects();
        requestAnimationFrame(() => this.draw());
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    drawMainCharacter() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.updateEndbossHealthbarVisibility();
        if (this.showEndbossHealthbar) {
            this.addToMap(this.endbossHealthbar);
        }
    }


    updateEndbossHealthbarVisibility() {
        if (this.character.x > 4500) {
            this.showEndbossHealthbar = true;
        }
    }


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


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    playGameSound(soundFilePath, volume = 0.2) {
        let gameSound = new Audio(soundFilePath);
        gameSound.volume = volume;
        gameSound.play();
    }

    playBottleShatterSound() {
        this.playGameSound('audio/bottle_shatter.mp3');
    }
}
