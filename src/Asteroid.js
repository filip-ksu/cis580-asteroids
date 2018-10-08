export default class Asteroid {

    constructor(radius, colour, level, canvasWidth, canvasHeight) {
        this.MAX_SPEED = 1 + level / 2;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.radius = radius;
        this.colour = colour;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.speedX = Math.random() * this.MAX_SPEED * 2 - this.MAX_SPEED;
        let maxY = Math.sqrt(this.MAX_SPEED * this.MAX_SPEED - this.speedX * this.speedX);
        this.speedY = Math.random() * maxY * 2 - maxY;
    }

    drawSelf(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        this.updatePosition();
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

    checkColision(asteroid) {
        // if (Math.sqrt((this.x - asteroid.x) * (this.x - asteroid.x) + (this.y - asteroid.y) * (this.y - asteroid.y)) <= this.radius + asteroid.radius) {
        //     let speedX = this.speedX + asteroid.speedX;
        //     let speedY = this.speedY + asteroid.speedY;
        //     let directionThis =
        //     this.speedX = asteroid.speedX;
        //     this.speedY = asteroid.speedY;
        //     asteroid.speedX = speedX;
        //     asteroid.speedY = speedY;
        // }
    }

    isHitByLaser(laser) {
        let distance = Math.sqrt(Math.pow(this.x - laser.x, 2) + Math.pow(this.y - laser.y, 2));
        let maxForColision = this.radius + laser.LENGTH / 2
        if (distance > maxForColision) {
            return false;
        }
        return true;
    }
}
