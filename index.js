const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
// ctx.fillStyle = "#1B0324";
var sparkpos
var HIGHSCORE = 0
let Bounce_sound=new Audio('./music/bounce.wav');
let place_sound=new Audio('./music/place.wav');
let death_sound=new Audio('./music/death.wav');
let music=new Audio('./music/music.wav');
Bounce_sound.sound=0.9
place_sound.sound=0.9
death_sound.sound=0.9

// ! CONSTS FOR OUR BALL
class Ball {
    constructor(x = canvas.width / 2, y = canvas.height - 20) {
        this.position = { x: x, y: 3 * y / 5 }
        this.vel = { x: 0, y: 0 };
        this.rad = 20;
        this.offset = 0;
        this.score = 0;
    }
    draw() {
        // ctx.beginPath();
        // ctx.fillStyle = 'green';
        // ctx.arc(this.position.x, this.position.y - this.offset, this.rad, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        ctx.fillStyle = "white";
        ctx.font = 'Bold 20px sans-serif';
        this.score = Math.max(this.score, Math.floor(-this.offset / 10))
        ctx.fillText(`Score:${this.score}`, 10, 50);
        ctx.fillText(`High Score:${Math.max(this.score, HIGHSCORE)}`, canvas.width - 200, 50);
        if (this.death()) {
            ctx.fillText(`YOU DIED! PRESS CTRL+R TO RESTART `, canvas.width / 2 - 190, canvas.height / 2);
        }
    }
    move() {
        this.position.y += this.vel.y
        this.position.x += this.vel.x
        this.vel.y += 0.1
        if (this.position.y < 3 * (canvas.height - 20) / 5) {
            this.offset = this.position.y - 3 * (canvas.height - 20) / 5
        }
        this.death();
        sprite.position.x = this.position.x - listSprites[Math.floor(sprite.index / 4)].width / 2
        sprite.position.y = this.position.y - listSprites[Math.floor(sprite.index / 4)].height + this.rad
        // this.collide()
    }
    animate() {

    }
    collide() {
        if (this.position.y > canvas.height - this.rad) {
            this.vel.y -= 0.1;
            this.vel.y *= -1;
            // console.log(this.vel);
            // console.log(this.vel.y)  ;
            // console.log("trial for collide  ")
            console.log(this.vel);
        }
    }
    death() {
        if (this.position.x < 0 || this.position.x > canvas.width) {
            return true;
        }
        return false;
    }
}
ball = new Ball()
class LineS {
    constructor() {
        this.points = [{ x: 0, y: canvas.height }, { x: canvas.width, y: canvas.height }]
        this.currentPoint = { x: canvas.width / 2, y: canvas.height }
        this.lines = [[this.points[0], this.points[1]]]
    }
    addPoint(x, y) {
        // this.points.push({x:x,y:y,offset_y:0});
        this.addline(this.currentPoint, { x: x, y: y });
        console.log(x, y);
        this.currentPoint = { x: x, y: y };
        sparksList.push(new Sparker(this.currentPoint.x, this.currentPoint.y));

    }
    addline(point1, point2) {
        console.log("LINE ADDED")
        this.lines.push([point1, point2])
        console.log(point1, point2)
        console.log(ball.offset);
        console.log(this.lines.length)
    }
    drawlines(ball) {
        this.lines.forEach(line => {
            this.drawwline(line[0], line[1], 5);
            this.ring(line[0].x, line[0].y - ball.offset);
            this.ring(line[1].x, line[1].y - ball.offset);
            this.checkCollide(line[0], line[1], ball.position)

        });
    }
    drawwline(a, b, size) {
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = size;
        ctx.moveTo(a.x, a.y - ball.offset);
        ctx.lineTo(b.x, b.y - ball.offset);
        ctx.stroke();
        ctx.stroke_style = 1;

    }
    checkCollide(pos1, pos2, posball) {
        const den = ((pos2.x - pos1.x) * (pos2.x - pos1.x) + (pos2.y - pos1.y) * (pos2.y - pos1.y));
        const t = -((pos1.x - posball.x) * (pos2.x - pos1.x) + (pos1.y - posball.y) * (pos2.y - pos1.y)) / den;
        if (t <= 1 && t >= 0) {
            var d = Math.abs((pos2.x - pos1.x) * (pos1.y - posball.y) - (pos2.y - pos1.y) * (pos1.x - posball.x));
            d = d / Math.sqrt(den);
            if (d <= 20) {
                if (ball.vel.y > 0) {
                    ball.vel.y = -1;
                    var m = (pos2.y - pos1.y) / (pos2.x - pos1.x);
                    m=Math.min(m,100);
                    ball.vel.x = m;
                    // var n={x:m,y:-1}
                    // n=this.unit(n)
                    // ball.vel=this.sub(ball.vel,this.mult(2*this.dot(ball.vel,n),n))
                    ball.vel = this.unit(ball.vel);
                    ball.vel = this.mult(9, ball.vel)
                    // var anglesp = Math.atan2(ball.vel.y, ball.vel.x);
                    // sparkpos = [ball.position.x - 20 * Math.cos(anglesp), ball.position.y + 20 * Math.sin(anglesp)];
                    Bounce_sound.play()
                }
                
            }
        }
    }
    unit(n) {
        var mag = (n.x * n.x + n.y * n.y);
        return this.mult(1 / mag, n);
    }
    mult(a, b) {
        return { x: a * b.x, y: a * b.y }
    }
    sub(a, b) {
        return { x: a.x - b.x, y: a.y - b.y }
    }
    dot(a, b) {
        return a.x * b.x + a.y * b.y;
    }
    ring(x, y) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.linewidth = 10;
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#1B0324";
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
    hoverline(x, y) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        // console.log(this.points[this.points.length-1]);
        ctx.moveTo(this.currentPoint.x, this.currentPoint.y - ball.offset);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

line = new LineS()

var POSX = 0;
var POXY = 0;
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return { x: x, y: y };
}

const tick = 60;
var a = { x: 0, y: 0 };
// !  TRIAL STARTS FOR BACKGROUND SHAPES
class shape {
    constructor(center, size, size2) {
        this.center = center
        this.angles = []
        for (let i = 0; i < size2; i++) {
            this.angles.push(i * 360 / size2);
        }
        this.size = size
    }
    draw() {
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        this.points = []
        var size = this.size;
        this.angles.forEach(angle => {
            this.points.push([this.center[0] + Math.sin(angle * Math.PI / 180) * size, this.center[1] + Math.cos(angle * Math.PI / 180) * size])
        });
        // for (let index = 0; index < this.angles.length; index++) {
        //     this.points.push([this.center[0]+Math.sin(angles[i]*Math.PI/180)*size,this.center[1]+Math.cos(angles[i]*Math.PI/180)*size])             
        // }
        ctx.moveTo(this.points[0][0], this.points[0][1])
        this.points.slice(1,).forEach(point => {
            ctx.lineTo(point[0], point[1])
        });
        ctx.closePath();
        ctx.stroke();
        this.rotate();
        ctx.globalAlpha = 1;
        // this.size -= .1;
    }
    // move()
    // {
    // }
    rotate() {
        for (let index = 0; index < this.angles.length; index++) {
            this.angles[index] += 1;
        }
        this.center[1] += 1;
    }
}

var sq = []
function chooseRandomShapes() {
    var listShapesSize = [3, 4, 5, 6]
    // var nShapes = Math.floor(Math.random() * 10 + 10)
    var nShapes = 4;
    for (let index = 0; index < nShapes; index++) {
        sq.push(new shape([Math.random() * canvas.width, -Math.floor(Math.random() * 2 * canvas.height / 3)], 40, listShapesSize[Math.floor(Math.random() * 4)]));
    }
}
function randomplatforms() {
    console.log("CALLED")
    t = Math.random() * canvas.height
    line.addline({ x: canvas.width * Math.random(), y: t - canvas.height + ball.offset }, { x: canvas.width * Math.random(), y: Math.random() * 100 + t - 50 - canvas.height + ball.offset })
    // console.log(ball.offset)
}
setInterval(chooseRandomShapes, 5000);
setInterval(randomplatforms, 7000);
function background() {
    sq.forEach(square => {
        square.draw();
    });
    console.log(sq.length)
    for (let i = 0; i < sq.length; i++) {
        if (sq[i].center[1] >= canvas.height) {
            sq = sq.slice(i + 1,)
            // console.log("REMOVED", sq.length)
        }
    }
}
// !  TRIAL ENDS FOR BACKGROUND SHAPES

// ! TRIAL STARTS FOR SPARKS
sparks = []
var coll_sparks = []
class Spark {
    constructor(loc, angle, speed, color, scale = 1) {
        this.loc = loc
        this.angle = angle
        this.speed = speed
        this.scale = scale
        this.color = color
        this.alive = true
    }
    point_towards(angle, rate) {
        rotate_direction = ((angle - this.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
        if (rotate_direction != 0) {
            rotate_sign = Math.abs(rotate_direction) / rotate_direction
        }
        if (Math.abs(rotate_direction) < rate) {
            this.angle = angle;
        }
        else {
            this.angle += rate * rotate_sign
        }
    }

    calculate_movement(dt) {
        return [Math.cos(this.angle) * this.speed * dt, Math.sin(this.angle) * this.speed * dt]
    }

    // # gravity and friction
    velocity_adjust(friction, force, terminal_velocity, dt) {
        var movement = this.calculate_movement(dt)
        movement[1] = min(terminal_velocity, movement[1] + force * dt)
        movement[0] *= friction
        this.angle = Math.atan2(movement[1], movement[0])
    }
    //     # if you want to get more realistic, the speed should be adjusted here

    move(dt) {
        var movement = this.calculate_movement(dt)
        this.loc[0] += movement[0]
        this.loc[1] += movement[1]
        this.speed -= 0.1

        if (this.speed <= 0) {
            this.alive = false;
        }
    }

    //     # a bunch of options to mess around with relating to angles...
    //     #this.point_towards(Math.PI / 2, 0.02)
    //     #this.velocity_adjust(0.975, 0.2, 8, dt)
    //     #this.angle += 0.1


    draw(offset = [0, 0]) {
        var points = []
        if (this.alive) {
            var points = [
                [this.loc[0] + Math.cos(this.angle) * this.speed * this.scale, this.loc[1] + Math.sin(this.angle) * this.speed * this.scale],
                [this.loc[0] + Math.cos(this.angle + Math.PI / 2) * this.speed * this.scale * 0.3, this.loc[1] + Math.sin(this.angle + Math.PI / 2) * this.speed * this.scale * 0.3],
                [this.loc[0] - Math.cos(this.angle) * this.speed * this.scale * 3.5, this.loc[1] - Math.sin(this.angle) * this.speed * this.scale * 3.5],
                [this.loc[0] + Math.cos(this.angle - Math.PI / 2) * this.speed * this.scale * 0.3, this.loc[1] - Math.sin(this.angle + Math.PI / 2) * this.speed * this.scale * 0.3],
            ]
            ctx.fillStyle = this.color
            ctx.beginPath()
            ctx.moveTo(points[0][0], points[0][1])
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i][0], points[i][1])
            }
            ctx.closePath();
            ctx.stroke();
        }
    }
}
class Sparker {
    constructor(POSX, POSY) {
        this.sparks = []
        this.POSX = POSX
        this.POSY = POSY
    }
    draw() {
        var POSX = this.POSX
        var POSY = this.POSY - ball.offset
        this.sparks.push(new Spark([POSX, POSY], Math.random() * 2 * Math.PI, Math.random() * 2 + 2, "#000", 1))
        this.sparks.sort()
        this.sparks.reverse()
        // console.log(POSX,POSY);
        for (let i = 0; i < this.sparks.length; i++) {
            this.sparks[i].move(1)
            this.sparks[i].draw()
            if (!this.sparks[i].alive) {
                // sparks.pop(i)
                // sparks.push(new Spark([POSX,POSY],Math.random()*2*Math.PI,Math.random()*3+3,"#000",1))
            }
        }
        if (this.sparks.length > 10) {
            this.sparks = this.sparks.slice(5,)
        }
    }
}
// for (let i = 0; i < 50;i++) {
//     sparks.push(new Spark([POSX,POSY],Math.random()*2*Math.PI,Math.random()*3+3,"#000",2))
// }
sparksList = [new Sparker(canvas.width / 2, canvas.height)]
// ! TRIAL ENDS FOR SPARKS

// ! TRIAL FOR NEW SPRITES STARTS
const listSprites = []
var nSprites = 8
for (let index = 0; index < nSprites; index++) {
    image = new Image()
    image.src = `./sprites/sprite${index + 1}.png`
    listSprites.push(image);
}

class Sprite {
    constructor() {
        this.position = { x: ball.position.x, y: ball.position.y }
        this.index = 0;
    }
    draw() {
        ctx.drawImage(listSprites[Math.floor(this.index / 4)], this.position.x, this.position.y - ball.offset);
        this.index++;
        if (this.index > 4 * nSprites - 1) {
            this.index = 0;
        }
    }
}
var flag = true
sprite = new Sprite();
// ! TRIAL FOR NEW SPRITES ENDS
var shake = true
var screen_shake = 0
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#1B0324";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    ball.draw();
    ball.move();
    sprite.draw()
    // console.log(ball)
    line.drawlines(ball);
    if (!ball.death()) {
        line.hoverline(a.x, a.y);
    }
    else {
        if (shake) {
            screen_shake = 15
            shake = false
            death_sound.play()
        }
    }
    if (screen_shake) {
        ball.offset += Math.random() * 20 - 10;
        if(ball.vel.y>0)
        ball.vel.y=-ball.vel.y
        screen_shake -= 1
    }
    console.log(screen_shake)
    sparksList.forEach(spark => {
        spark.draw();
    });
    background();
    // requestAnimationFrame(tick);
}

canvas.addEventListener("mousedown", function (e) {
    t = getMousePosition(canvas, e);
    if (!ball.death()) {
        line.addPoint(t.x, t.y + ball.offset);
        place_sound.play()
    }
});
canvas.addEventListener("mousemove", function (e) {
    a = getMousePosition(canvas, e);
});
animate();