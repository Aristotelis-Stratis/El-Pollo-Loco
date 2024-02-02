/**
 * Represents a game level containing enemies, clouds, background objects, coins, bottles, and an end boss.
 * @class
 */

class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    endboss;
    level_end_x = 4500;

    constructor(e, c, bo, co, bot,endboss) {
        this.enemies = e;
        this.clouds = c;
        this.backgroundObjects = bo;
        this.coins = co;
        this.bottles = bot;
        this.endboss = endboss;
    }
}
