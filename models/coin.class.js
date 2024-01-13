class Coin extends MoveableObject {
    percentage = 100;
    animationInterval;

    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = x+500;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.offset = {
            top: 40,
            right: 40,
            bottom: 75,
            left: 40
        };
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            this.toggleImage();
        }, 450);
    }

    toggleImage() {
        if (this.img.src.endsWith('coin_1.png')) {
            this.img.src = 'img/8_coin/coin_2.png';
        } else {
            this.img.src = 'img/8_coin/coin_1.png';
        }
    }

    stopAnimation() {
        clearInterval(this.animationInterval);
    }
}