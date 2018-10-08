export default class Player {

    constructor(x, y, width, height, colour, canvasWidth, canvasHeight) {
        this.ROTATION_SPEED = 3;
        this.MAX_SPEED = 8;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.rotation = 90;
        this.speedX = 0;
        this.speedY = 0;
        this.accelerate = false;
    }

    drawSelf(ctx) {
        let sin = Math.sin(this.rotation / 180 * Math.PI);
        let cos = Math.cos(this.rotation / 180 * Math.PI);
        let halfW = this.width / 2;
        let halfH = this.height / 2;
        if (this.accelerate) {
            ctx.fillStyle = "#ff7f00";
            ctx.beginPath();
            ctx.moveTo(this.x - halfW * cos - halfH * sin, this.y + halfH * cos - halfW * sin);
            ctx.lineTo(this.x - halfH / 2 * sin, this.y + halfH / 2 * cos);
            ctx.lineTo(this.x + halfW * cos - halfH * sin, this.y + halfH * cos + halfW * sin);
            ctx.lineTo(this.x - halfH / 2 * 3 * sin, this.y + halfH / 2 * 3 * cos);
            ctx.closePath();
            ctx.fill();
        }
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.moveTo(this.x - halfW * cos - halfH * sin, this.y + halfH * cos - halfW * sin);
        ctx.lineTo(this.x + halfH * sin, this.y - halfH * cos);
        ctx.lineTo(this.x + halfW * cos - halfH * sin, this.y + halfH * cos + halfW * sin);
        ctx.lineTo(this.x - halfH / 2 * sin, this.y + halfH / 2 * cos);
        ctx.closePath();
        ctx.fill();
    }

    update(currentInput) {
        this.accelerate = currentInput.up;
        this.updateRotation(currentInput);
        this.updateSpeed(currentInput);
        this.updatePosition();
    }

    updateRotation(currentInput) {
        if (currentInput.right) {
            this.rotation += this.ROTATION_SPEED;
        }
        if (currentInput.left) {
            this.rotation -= this.ROTATION_SPEED;
        }
        this.rotation %= 360;
        if (this.rotation < 0) {
            this.rotation += 360;
        }
    }

    updateSpeed(currentInput) {
        let sin = Math.sin(this.rotation / 180 * Math.PI);
        let cos = Math.cos(this.rotation / 180 * Math.PI);
        let speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
        if (currentInput.up && speed < this.MAX_SPEED) {
            this.speedX += 0.1 * sin;
            this.speedY -= 0.1 * cos;
        } else {
            this.speedX *= 0.995;
            this.speedY *= 0.995;
        }
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > this.canvasWidth) {
            this.x -= this.canvasWidth;
        }
        if (this.x < 0) {
            this.x += this.canvasWidth;
        }
        if (this.y > this.canvasHeight) {
            this.y -= this.canvasHeight;
        }
        if (this.y < 0) {
            this.y += this.canvasHeight;
        }
    }

    inColisonWith() {
        return false;
    }
}
