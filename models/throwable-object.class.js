class ThrowableObject extends MoveableObject {
    speedY = 30;
    speedX = 20;

    //keyboard Taste D zum werfen


    constructor(x, y, bottleBar) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 65;
        this.throw(bottleBar);
    }

    throw(bottleBar) {
        this.speedY = 30;
        this.speedX = 20;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 60);
        bottleBar.setCollectedBottles(bottleBar.collectedBottles - 1);
    }
}