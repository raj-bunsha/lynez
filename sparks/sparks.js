const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

class Ball {
    constructor(x = canvas.width / 2, y = canvas.height - 20) {
        this.position = { x: x, y: 3 * y / 5 }
        this.vel = { x: 0, y: 0 };
        this.rad = 20;
        this.offset = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(this.position.x, this.position.y - this.offset, this.rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    move() {
        this.position.y += this.vel.y
        this.position.x += this.vel.x
        this.vel.y += 0.1
        if (this.position.y < 3 * (canvas.height - 20) / 5) {
            this.offset = this.position.y - 3 * (canvas.height - 20) / 5
        }
        // this.collide()
    }
    animate() {

    }
    collide() {
        if (this.position.y > canvas.height - this.rad) {
            this.vel.y -= 0.1;
            this.vel.y *= -1;
            console.log(this.vel);
            // console.log(this.vel.y);
        }
    }
}
ball = new Ball();
function animate()
{
    requestAnimationFrame(animate);
    ball.draw();
}
animate();