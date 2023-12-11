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
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {  //ThrowableObject should always fall
            return true;
        } else {
            return this.y < 150;
        }
    }

    // character.isColliding(chicken)
    isColliding(mo) {
        return this.x + this.width > mo.x && // this.x + this.width - this.offset.right > mo.x + mo.offset.left
            this.y + this.height > mo.y && // this.y + this.height - this.offset.bottom > mo.y + mo.offset.top
            this.x < mo.x + mo.width &&    // this.x + this.offset.left < mo.x + mo.width - mo.offset.right
            this.y < mo.y + mo.height      // this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom 

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
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in seconds
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