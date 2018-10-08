import Player from "./Player";
import Asteroid from "./Asteroid";
import Laser from "./Laser";

export default class Asteroids {

    constructor(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;

        this.COLOUR_PLAYER = "#ffffff";
        this.PLAYER_WIDTH = 20;
        this.PLAYER_HEIGHT = 40;

        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.buffer = document.createElement("canvas");
        this.bufferCtx = this.buffer.getContext("2d");

        this.canvas.width = this.WIDTH;
        this.buffer.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.buffer.height = this.HEIGHT;

        this.player = new Player(
            this.WIDTH / 2,
            this.HEIGHT / 2,
            this.PLAYER_WIDTH,
            this.PLAYER_HEIGHT,
            this.COLOUR_PLAYER,
            this.WIDTH,
            this.HEIGHT
        );
        this.INITIAL_ASTEROIDS_CNT = 4;
        this.asteroids = [];
        this.lasers = [];
        this.level = 0;
        this.lifes = 3;
        this.points = 0;

        this.currentInput = {
            space: false,
            left: false,
            right: false,
            up: false,
            down: false,
        }

        this.previousInput = {
            space: false,
        }

        document.body.getElementsByTagName("main")[0].appendChild(this.canvas);
        document.getElementById('btn-new-game').addEventListener('click', () => this.newGame(event));
    }

    updateWorld() {
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            if (!this.lasers[i].update()) {
                this.lasers.splice(i, 1);
            }
        }
        for (let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].update();
        }
        this.fire();
        this.player.update(this.currentInput);
    }

    fire() {
        if (this.currentInput.space && !this.previousInput.space) {
            this.previousInput.space = true;
            this.lasers.push(new Laser(
                this.player.x,
                this.player.y,
                this.player.rotation,
                this.COLOUR_PLAYER,
                this.WIDTH,
                this.HEIGHT
            ));
        }
    }

    renderGame() {
        this.bufferCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        for (let i = 0; i < this.lasers.length; i++) {
            this.lasers[i].drawSelf(this.bufferCtx);
        }
        for (let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].drawSelf(this.bufferCtx);
        }
        this.player.drawSelf(this.bufferCtx);
        this.drawUi();
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        this.ctx.drawImage(this.buffer, 0, 0);
    }

    drawUi() {
        this.bufferCtx.font = "40px Open-Sans";
        this.bufferCtx.fillStyle = "#ffffff";
        this.bufferCtx.fillText("Lvl " + this.level, 10, 40);
        this.bufferCtx.fillText(this.points, 10, 90);
        let x = this.WIDTH - this.PLAYER_WIDTH;
        let y = this.PLAYER_HEIGHT;
        this.bufferCtx.strokeStyle = "#ffffff";
        for (let i = 0; i < this.lifes; i++) {
            this.bufferCtx.beginPath();
            this.bufferCtx.moveTo(x - this.PLAYER_WIDTH / 2, y + this.PLAYER_HEIGHT / 2);
            this.bufferCtx.lineTo(x, y - this.PLAYER_HEIGHT / 2);
            this.bufferCtx.lineTo(x + this.PLAYER_WIDTH / 2, y + this.PLAYER_HEIGHT / 2);
            this.bufferCtx.lineTo(x, y + this.PLAYER_HEIGHT / 4);
            this.bufferCtx.closePath();
            this.bufferCtx.stroke();
            x -= this.PLAYER_WIDTH * 3 / 2;
        }
    }

    checkColisions() {
        let playerAlive = true;
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            playerAlive &= !this.player.inColisonWith(this.asteroids[i]);
            for (let j = i - 1; j >= 0; j--) {
                this.asteroids[i].checkColision(this.asteroids[j]);
            }
            for (let j = this.lasers.length - 1; j >= 0; j--) {
                if (this.asteroids[i].isHitByLaser(this.lasers[j])) {
                    let asteroid = this.asteroids[i];
                    this.asteroids.splice(i, 1);
                    this.lasers.splice(j, 1);
                    this.points += Math.pow(Math.round(asteroid.radius / 2), 2);
                    break;
                }
            }
        }
        if (this.asteroids.length == 0) {
            this.newLevel();
        }
    }

    gameLoop() {
        this.updateWorld();
        this.checkColisions();
        this.renderGame();
        window.requestAnimationFrame(() => this.gameLoop());
    }

    handleKeydown(event) {
        switch(event.key) {
            case ' ':
                this.currentInput.space = true;
                break;
            case 'ArrowLeft':
                this.currentInput.left = true;
                break;
            case 'ArrowRight':
                this.currentInput.right = true;
                break;
            case 'ArrowUp':
                this.currentInput.up = true;
                break;
            case 'ArrowDown':
                this.currentInput.down = true;
                break;
        }
    }

    handleKeyup(event) {
        switch(event.key) {
            case ' ':
                this.previousInput.space = false;
                this.currentInput.space = false;
                break;
            case 'ArrowLeft':
                this.currentInput.left = false;
                break;
            case 'ArrowRight':
                this.currentInput.right = false;
                break;
            case 'ArrowUp':
                this.currentInput.up = false;
                break;
            case 'ArrowDown':
                this.currentInput.down = false;
                break;
        }
    }

    newLevel() {
        this.level++;
        let asteroidsCnt = this.INITIAL_ASTEROIDS_CNT + this.level * this.level / 3;
        for (let i = 0; i < asteroidsCnt; i++) {
            this.asteroids.push(new Asteroid(
                Math.random() * this.PLAYER_HEIGHT / 2 + this.PLAYER_HEIGHT / 2,
                this.COLOUR_PLAYER,
                this.level,
                this.WIDTH,
                this.HEIGHT
            ));
        }
    }

    newGame(event) {
        event.preventDefault();
        if (confirm('Do you really want to start a new game?')) {
            window.location.reload();
        }
    }

    loop() {
        window.addEventListener('keydown', () => this.handleKeydown(event));
        window.addEventListener('keyup', () => this.handleKeyup(event));
        this.newLevel();
        this.gameLoop();
    }

}
