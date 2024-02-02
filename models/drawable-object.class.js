/**
* Represents a drawable object in the game.
* @class
*/

class DrawableObject {
    x = 120;
    y = 365;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };


    /**
     * Loads an image from the given path and assigns it to the object's 'img' property.
     * @function
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads an array of images and stores them in the image cache.
     * @function
     * @param {string[]} array - An array of image paths to load.
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the object on the canvas context.
     * @function
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {}
    }

    
    /**
     * Draws a frame around the object for debugging purposes.
     * @function
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottles || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    
    /**
     * Resolves the index of the image to use based on a given percentage.
     * @function
     * @param {number} percentage - The percentage value (0-100) used to determine the image index.
     * @returns {number} - The index of the image to use.
     */
    resolveImagesIndex(percentage) {
        if (percentage >= 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}