class MoveableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 40);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&          // R->L // Rechteck-Kollision in X-Richtung: Dieser Ausdruck überprüft, ob der rechte Rand des aktuellen Objekts rechts vom linken Rand des anderen Objekts liegt.
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&         // T->B // Rechteck-Kollision in Y-Richtung: Dieser Ausdruck überprüft, ob der untere Rand des aktuellen Objekts unterhalb des oberen Rands des anderen Objekts liegt.
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&            // L->R // Rechteck-Kollision in X-Richtung (umgekehrt): Dieser Ausdruck überprüft, ob der linke Rand des aktuellen Objekts links vom rechten Rand des anderen Objekts liegt.
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom              // B->T // Rechteck-Kollision in Y-Richtung (umgekehrt):Dieser Ausdruck überprüft, ob der obere Rand des aktuellen Objekts über dem unteren Rand des anderen Objekts liegt.
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}