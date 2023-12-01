class Coin extends DrawableObject {
    percentage = 100;

    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }

    animate() {
        setInterval(() => {
            this.toggleImage();
        }, 450); // Hier kannst du die Geschwindigkeit der Animation anpassen
    }

    toggleImage() {
        if (this.img.src.endsWith('coin_1.png')) {
            this.img.src = 'img/8_coin/coin_2.png';
        } else {
            this.img.src = 'img/8_coin/coin_1.png';
        }
    }

}