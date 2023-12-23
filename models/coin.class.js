class Coin extends DrawableObject {
    percentage = 100;

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 0 + Math.random() * 2400;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.offset = {
            top: 65,
            right: 130,
            bottom: 130,
            left: 65
        };
    }

    animate() {
        setInterval(() => {
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

}