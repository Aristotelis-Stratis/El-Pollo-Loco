const MAX_BOTTLES = 13;

class BottleBar extends DrawableObject {
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    collectedBottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 40;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setCollectedBottles(0);
    }

    setCollectedBottles(count) {
        console.log(`Number of collected bottles: ${count}`);

        this.collectedBottles = count;
        let path = this.IMAGES_BOTTLES[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex() {
        let percentage = (this.collectedBottles / MAX_BOTTLES) * 100;

        if (percentage >= 80) {
            return 5;
        } else if (percentage >= 60) {
            return 4;
        } else if (percentage >= 40) {
            return 3;
        } else if (percentage >= 20) {
            return 2;
        } else if (percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}