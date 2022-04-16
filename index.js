const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// ! CONSTS FOR OUR BALL
const startingAngle = 70;
const rad = 20;
class Ball{
    constructor()
    {
        this.position = {x:canvas.width/2,y:canvas.height}
        this.vel={x:0,y:-5};
    }
    draw()
    {
        
    }
    move()
    {
        this.position.y += this.vel.y
    }
    animate()
    {
        
    }
    collide()
    {
        
    }
}
ball = new Ball()
class LineS {
    constructor() {
        this.position = {x:canvas.width/2,y:canvas.height}
        this.ring(this.position.x,this.position.y)
        this.points=[{x:canvas.width/2,y:canvas.height,offset_y:0}]
    }
    addPoint(x,y)
    {
        this.points.push({x:x,y:y,offset_y:0});
        this.position ={x:x,y:y};
    }
    drawlines()
    {
        var prev=this.points[0];
        this.points.slice(1,).forEach(element => {
            this.ring(element.x,element.y-element.offset_y);
            ctx.beginPath();
            ctx.moveTo(prev.x,prev.y-prev.offset_y);
            if(element.y>element.offset_y)
            {
                ctx.lineTo(element.x,element.y-element.offset_y);
            }
            ctx.stroke();
            prev=element;
        });
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
        console.log(this.points[this.points.length-1]);
        ctx.moveTo(this.points[this.points.length-1].x,this.points[this.points.length-1].y-this.points[this.points.length-1].offset_y);
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
    line.drawlines();
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

