const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


// ! CONSTS FOR OUR BALL
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
            // console.log(this.vel.y);
        }
    }
}
ball = new Ball()
class LineS {
    constructor() {
        this.points=[{x:0,y:canvas.height},{x:canvas.width,y:canvas.height}]
        this.currentPoint={x:canvas.width/2,y:canvas.height}
        this.lines=[[this.points[0],this.points[1]]]
    }
    addPoint(x,y)
    {
        // this.points.push({x:x,y:y,offset_y:0});
        this.addline(this.currentPoint,{x:x,y:y})
        this.currentPoint ={x:x,y:y};
    }
    addline(point1,point2)
    {
        this.lines.push([point1,point2])
    }
    drawlines(ball)
    {
        this.lines.forEach(line => {
            this.drawwline(line[0],line[1]);
            this.ring(line[0].x,line[0].y);
            this.ring(line[1].x,line[1].y);
            this.checkCollide(line[0],line[1],ball.position)
            
        });
    }
    drawwline(a,b)
    {
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
    }
    checkCollide(pos1,pos2,posball)
    {   
        const den=((pos2.x-pos1.x)*(pos2.x-pos1.x)+(pos2.y-pos1.y)*(pos2.y-pos1.y));
        const t=-((pos1.x-posball.x)*(pos2.x-pos1.x)+(pos1.y-posball.y)*(pos2.y-pos1.y))/den;
        if(t<=1&&t>=0)
        {
            // console.log("HERE")
            var d=Math.abs((pos2.x-pos1.x)*(pos1.y-posball.y)-(pos2.y-pos1.y)*(pos1.x-posball.x));
            d=d/Math.sqrt(den);
            // console.log(d);
            if(d<=20)
            {
                if(ball.vel.y>0)
                {
                    ball.vel.y=-10 ;
                    // var m=(pos2.y-pos1.y)/(pos2.x-pos1.x);
                    // var n={x:m,y:-1}
                    // n=this.unit(n)
                    // ball.vel=this.sub(ball.vel,this.mult(2*this.dot(ball.vel,n),n))
                }

            }
        }
    }
    unit(n)
    {
        var mag=(n.x*n.x+n.y*n.y);
        return this.mult(n,1/mag);
    }
    mult(a,b)
    {
        return {x:a*b.x,y:a*b.y}
    }
    sub(a,b)
    {
        return {x:a.x-b.x,y:a.y-b.y}
    }
    dot(a,b)
    {
        return a.x*b.x+a.y*b.y;
    }
    ring(x,y)
    {
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.linewidth=10;
        ctx.arc(x,y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.arc(x,y, 3, 0, 2 * Math.PI);
        ctx.fill();
    }
    hoverline(x,y)
    {
        ctx.beginPath();
        // console.log(this.points[this.points.length-1]);
        ctx.moveTo(this.currentPoint.x,this.currentPoint.y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

line = new LineS()

var POSX=0;
var POXY = 0;
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return {x:x,y:y};
}

const tick=60;
var a={x:0,y:0};
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animate);
    ball.draw();
    ball.move();
    line.drawlines(ball);
    line.hoverline(a.x,a.y)
    // requestAnimationFrame(tick);
}


canvas.addEventListener("mousedown", function(e)
{
    t=getMousePosition(canvas, e);
    line.addPoint(t.x,t.y);
});
canvas.addEventListener("mousemove", function(e)
{
    a=getMousePosition(canvas, e);;
});
animate();
  

