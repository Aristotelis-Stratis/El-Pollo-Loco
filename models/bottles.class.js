class Bottles extends MoveableObject {

  width = 60;
  height = 60;

  IMAGES_BOTTLE = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    this.x = 400 + Math.random() * 2400;
    this.y = 120 + Math.random() * 250;
    this.offset = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };
  }

  collect() {
    this.playBottleCollectSound();
    // Weitere Aktionen, die ausgeführt werden sollen, wenn eine Flasche gesammelt wird
  }

  throw() {
    this.playBottleThrowSound();
  }

  shatter() {
    this.playBottleShatterSound();
  }

  playBottleCollectSound() {
    let bottleSound = new Audio('audio/bottle_collect.mp3');
    bottleSound.play();
  }

  playBottleThrowSound() {
    let bottleSound = new Audio('audio/bottle_throw.mp3');
    bottleSound.play();
  }

  playBottleShatterSound() {
    let bottleSound = new Audio('audio/bottle_shatter.mp3');
    bottleSound.play();
  }

}