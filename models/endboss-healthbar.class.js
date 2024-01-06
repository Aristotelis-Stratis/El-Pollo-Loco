class EndbossHealthbar extends DrawableObject {
    IMAGES_BOSS_HEALTH_FULL = ['img/7_statusbars/2_statusbar_endboss/blue.png'];
    IMAGES_BOSS_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    bossEnergy = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOSS_HEALTH_FULL);
        this.loadImages(this.IMAGES_BOSS_HEALTH);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(bossEnergy) {
        this.bossEnergy = bossEnergy;
        let path;
        if (this.bossEnergy === 100) {
            path = this.IMAGES_BOSS_HEALTH_FULL[0];
        } else {
            path = this.IMAGES_BOSS_HEALTH[this.resolveImagesIndex()];
        }
        this.img = this.imageCache[path];
    }
    

    resolveImagesIndex() {
        if (this.bossEnergy == 100) {
            return 5;
        } else if (this.bossEnergy > 80) {
            return 4;
        } else if (this.bossEnergy > 60) {
            return 3;
        } else if (this.bossEnergy > 40) {
            return 2;
        } else if (this.bossEnergy > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
