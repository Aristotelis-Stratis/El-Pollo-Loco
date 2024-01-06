class Endboss extends MoveableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    hadFirstContact = false;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.x = 2550;
        this.speed = 6.15 + Math.random() * 1.2;
        this.offset = {
            top: 60,
            right: 20,
            bottom: 90,
            left: 20
        };
    }

    animate() {
        let i = 0;
        setInterval(() => {
            console.log(i);
            if (i < 10) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.energy > 0) {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            } else if (this.bossIsHit()) {
                this.playAnimation(this.IMAGES_HURT);
                // this.hurt_sound.play(); //BOSS HURT SOUND 
            } else if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            i++;

            if (world && world.character.x > 1900 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 150);
    }

    bossIsHit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
            // Boss dead i.e GAME WON
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    endbossCollision(mo) {
        // Überprüfen, ob eine Kollision mit einem anderen Objekt (mo) stattfindet
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&  // R->L // Überprüft, ob der rechte Rand des Endbosses rechts vom linken Rand des anderen Objekts liegt
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&  // T->B // Überprüft, ob der untere Rand des Endbosses unterhalb des oberen Rands des anderen Objekts liegt
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&  // L->R // Überprüft, ob der linke Rand des Endbosses links vom rechten Rand des anderen Objekts liegt
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom  // B->T // Überprüft, ob der obere Rand des Endbosses über dem unteren Rand des anderen Objekts liegt
        );
    }
}
