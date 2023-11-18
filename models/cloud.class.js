class Cloud extends MoveableObject {
    y = 25;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
    
        this.x = 0 + Math.random() * 500;
    }
}