/**
 * Represents a status bar that displays various statuses using images based on percentage.
 * @class
 * @extends DrawableObject
 */

class Statusbar extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 15;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
    * Sets the percentage value for the status bar and updates its displayed image accordingly.
    * @method
    * @param {number} percentage - The percentage value to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImagesIndex(this.percentage)];
        this.img = this.imageCache[path];
    }
}