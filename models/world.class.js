class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    collectedCoins = 0;
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossHealthbar = new EndbossHealthbar();
    DKeyPressed = false;
    throwableObjects = [];
    bottles = [
        new Bottles(0, 100),
        new Bottles(0, 200),
        new Bottles(0, 300),
        new Bottles(0, 400),
        new Bottles(0, 500),
        new Bottles(0, 600),
        new Bottles(0, 800),
        new Bottles(0, 1000),
        new Bottles(0, 1200),
        new Bottles(0, 1400),
        new Bottles(0, 1600),
        new Bottles(0, 1800),
        new Bottles(0, 2000),
    ];
    coins = [
        new Coin(250, 100),
        new Coin(400, 150),
        new Coin(600, 160),
        new Coin(800, 90),
        new Coin(1000, 50),
        new Coin(1200, 140),
        new Coin(1600, 200),
        new Coin(2000, 220)
    ];


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
        this.endboss = new Endboss();
        this.coins.forEach(coin => coin.animate());
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowObjects();
            this.checkEndbossCollisions();
        }, 100);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                // console.log('Character Energy =', this.character.energy);
                this.statusBar.setPercentage(this.character.energy);
                console.log('Collision occurred!');
            }
        })
    }

    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                this.playCoinSound();
            }
        });
    }

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1);
                this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles + 1);
                this.playBottleCollectSound();
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.D && !this.DKeyPressed && this.bottleBar.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.setCollectedBottles(this.bottleBar.collectedBottles - 1);
        }
        this.DKeyPressed = this.keyboard.D;
    }

    checkEndbossCollisions() {
        this.throwableObjects.forEach((bottle, index) => {
            if (!bottle.hasCollided && this.endboss.endbossCollision(bottle)) {
                bottle.hasCollided = true;
                this.endboss.bossIsHit();
                this.playBottleShatterSound();
                bottle.animateBottleSplash();
                console.log('REMAINING BOSS HP = ', this.endboss.energy);
                if (this.endboss.energy <= 0) {
                    console.log('THE BOSS IS DEAD NOW');
                }
    
                // Verzögerung, um die Flasche zu entfernen
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1);
                }, 1000); // Zeit entsprechend der Dauer der Splash-Animation
            }
        });
    }

    removeEnemyFromCanvas(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            this.y -= 50;
            this.x = this.x;
        }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.coins.forEach(coin => this.addToMap(coin));
        this.bottles.forEach(bottle => this.addToMap(bottle));
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        if (this.character.x > 1700) {
            this.addToMap(this.endbossHealthbar);
        }
        this.coinBar.draw(this.ctx);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
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
        mo.drawFrame(this.ctx);

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

    playCoinSound() {
        let coinSound = new Audio('audio/coin.mp3');
        coinSound.volume = 0.2;
        coinSound.play();
    }

    playBottleCollectSound() {
        let bottleSound = new Audio('audio/bottle_collect.mp3');
        bottleSound.play();
    }

    playBottleThrowSound() {
        let bottleSound = new Audio('audio/bottle_throw.mp3');
        bottleSound.play();
    }

    playBottleShatterSound() {
        let bottleSound = new Audio('audio/bottle_shatter.mp3');
        bottleSound.play();
    }
}
