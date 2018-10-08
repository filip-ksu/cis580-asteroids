export default class Laser {

    constructor(x, y, direction, colour, canvasWidth, canvasHeight) {
        this.SPEED = 10;
        this.LENGTH = 10;
        this.x = x;
        this.y = y;
        this.direction = direction
        this.colour = colour;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        let sin = Math.sin(direction / 180 * Math.PI);
        let cos = Math.cos(direction / 180 * Math.PI);
        this.speedX = this.SPEED * sin;
        this.speedY = this.SPEED * -cos;
    }

    drawSelf(ctx) {
        let sin = Math.sin(this.direction / 180 * Math.PI);
        let cos = Math.cos(this.direction / 180 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.moveTo(this.x + this.LENGTH / 2 * sin, this.y - this.LENGTH / 2 * cos);
        ctx.lineTo(this.x - this.LENGTH / 2 * sin, this.y + this.LENGTH / 2 * cos);
        ctx.stroke();
    }

    update() {
        return this.updatePosition();
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > this.canvasWidth) {
            return false
        }
        if (this.x < 0) {
            return false
        }
        if (this.y > this.canvasHeight) {
            return false
        }
        if (this.y < 0) {
            return false
        }
        return true;
    }
}
