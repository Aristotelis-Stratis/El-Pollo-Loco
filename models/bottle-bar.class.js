/**
 * Represents a status bar for collected bottles in the game.
 * @extends DrawableObject
 */

MAX_BOTTLES = 17;
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
        this.x = 15;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setCollectedBottles(0);
    }

    
    /**
     * Set the number of collected bottles and update the bottle bar's image.
     * @param {number} count - The number of collected bottles.
     */
    setCollectedBottles(count) {
        this.collectedBottles = count;
        let percentage = (this.collectedBottles / MAX_BOTTLES) * 100;
        let path = this.IMAGES_BOTTLES[this.resolveImagesIndex(percentage)];
        this.img = this.imageCache[path];
    }
}
