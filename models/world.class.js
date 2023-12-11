class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();

    coins = [
        new Coin(250, 100),
        new Coin(400, 150),
        new Coin(600, 160),
        new Coin(800, 90),
        new Coin(1000, 50),
        new Coin(1200, 140),
        new Coin(1600, 200),
        new Coin(2000, 220),
        new Coin(2400, 180),
        new Coin(2800, 120),
        new Coin(3000, 160),
        new Coin(3200, 190)
    ];
    
    collectedCoins = 0;
    coinBar = new CoinBar();
    
    throwableObjects = [];

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
        this.coins.forEach(coin => coin.animate());
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 750);

        setInterval(() =>{
            this.checkCoinCollisions();
        }, 50);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                console.log(this.character.energy);
                this.statusBar.setPercentage(this.character.energy);
            }
        })
    }

    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                // Der Charakter hat die Münze eingesammelt
                this.coins.splice(index, 1); // Entferne die Münze aus dem Array
                this.coinBar.setCollectedCoins(this.coinBar.collectedCoins + 1);
                // Hier kannst du weitere Aktionen durchführen, z.B. Sound abspielen, Punkte erhöhen, etc.
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    // draw() wird immer wieder aufgerufen
    draw() {
        // space for fixed objects
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);  
        this.coins.forEach(coin => this.addToMap(coin));

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.coinBar.draw(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
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
}

