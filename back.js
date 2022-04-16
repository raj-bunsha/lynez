const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
class shape
{
    constructor(center,size,size2)
    {
        this.center=center
        this.angles=[]
        for (let i = 0; i < size2; i++) 
        {
            this.angles.push(i*360/size2);
        }
        this.size=size
    }
    draw()
    {
        ctx.globalAlpha=0.3;
        ctx.beginPath();
        this.points=[]
        var size=this.size;
        this.angles.forEach(angle => {
            this.points.push([this.center[0]+Math.sin(angle*Math.PI/180)*size,this.center[1]+Math.cos(angle*Math.PI/180)*size])
        });
        // for (let index = 0; index < this.angles.length; index++) {
        //     this.points.push([this.center[0]+Math.sin(angles[i]*Math.PI/180)*size,this.center[1]+Math.cos(angles[i]*Math.PI/180)*size])             
        // }
        ctx.moveTo(this.points[0][0],this.points[0][1])
        this.points.slice(1,).forEach(point => {
            ctx.lineTo(point[0],point[1])
        });
        ctx.closePath();
        ctx.stroke();
        this.rotate();
        ctx.globalAlpha=1;
    }
    // move()
    // {
        
    // }
    rotate()
    {
        for (let index = 0; index < this.angles.length; index++) {
            this.angles[index] += 1;
        }
        this.center[1]+=1;
    }
}

var sq=[]
sq.push(new shape([100,0],40,4))
sq.push(new shape([200,0],40,3))
sq.push(new shape([300,0],40,5))
sq.push(new shape([400,0],40,6))
function background()
{
    sq.forEach(square => {
        square.draw();
    });
}
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animate)
    background()
}
animate()