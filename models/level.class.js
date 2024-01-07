class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 3200;

    constructor(e, c, bo, co, bot) {
        this.enemies = e;
        this.clouds = c;
        this.backgroundObjects = bo;
        this.coins = co;
        this.bottles = bot;
    }
}

// ENDBOSS IMPLEMENTIEREN