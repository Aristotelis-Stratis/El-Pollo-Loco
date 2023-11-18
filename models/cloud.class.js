class Cloud extends MoveableObject {
    //img\5_background\layers\4_clouds\1.png

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
    
        this.x = 200 + Math.random() * 500;
    }
}