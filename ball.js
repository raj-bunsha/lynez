const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

class Ball{
    constructor(x=canvas.width/2,y=canvas.height-20)
    {
        this.position = {x:x,y:3*y/5}
        this.vel={x:0,y:0};
        this.rad = 20;
    }
    draw()
    {
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(this.position.x, this.position.y, this.rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    move()
    {
        this.position.y += this.vel.y
        this.vel.y+=0.1
        this.collide()
    }
    animate()
    {
           
    }
    collide()
    {
        if(this.position.y>canvas.height-this.rad)
        {
            this.vel.y-=0.1;
            this.vel.y*=-1;
            console.log(this.vel.y);
        }
    }
}
ball=new Ball();
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animate);
    ball.draw();
    ball.move();
    // requestAnimationFrame(tick);
}
animate();
// ctx.width = innerWidth;
// ctx.height = innerHeight;
// const ball = {
//     x: 25,
//     y: 65 * canvas.height / 100
// };
// const velocity = .5;
// const startingAngle = 70;
// const gravity = { x: 0, y: .2 };
// const rad = 20;
// let moveX = Math.cos(Math.PI / 180 * startingAngle) * velocity;
// let moveY = Math.sin(Math.PI / 180 * startingAngle) * velocity;
// const drawMe = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // ! activate ball.x commands to get projectile like motion
//     // if (ball.x > canvas.width - rad || ball.x < rad) moveX = -moveX;
//     // ball.x += moveX;

//     // ! have our gravity
//     if (ball.y > canvas.height - rad || ball.y < rad) {
//         moveY = -moveY;
//         console.log("Hit the bottom");
//     }
//     ball.y += moveY;
//     moveY += gravity.y;
//     ctx.beginPath();
//     ctx.fillStyle = 'green';
//     ctx.arc(ball.x, ball.y, rad, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.closePath();
// }
// setInterval(drawMe, 10);

// const ball = {
//     x: canvas.width/2,
//     y: 65 * canvas.height / 100
// };
// function drawCircle()
// {

// }
// setInterval(drawCircle,10);