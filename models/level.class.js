class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2800;

    constructor(e, c, bo) {
        this.enemies = e;
        this.clouds = c;
        this.backgroundObjects = bo;
    }
}