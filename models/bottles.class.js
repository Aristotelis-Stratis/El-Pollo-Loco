class Bottles extends MoveableObject {
  //  hat alle Eigenschaften von MovableObject da es vererbt wird!

  width = 60;
  height = 60;

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    this.x = 400 + Math.random() * 3200;
    this.y = 370;
  }
}