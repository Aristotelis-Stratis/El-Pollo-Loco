/**
 * Represents a bottle object in the game.
 * @extends MoveableObject
 */

class Bottles extends MoveableObject {

    width = 60;
    height = 60;
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
        this.x = x + 450;
        this.y = y;
        this.offset = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };
    }
}
