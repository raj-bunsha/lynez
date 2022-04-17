const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
var circle_effects=[]
offset=0
function run()
{
    circle_effects.sort()
    circle_effects.reverse()
    for (let i = 0; i < circle_effects.length; i++) {
        circle=circle_effects[i]
        circle[1] += circle[3][0]
        circle[2][0] -= circle[2][1]
        circle[3][0] -= circle[3][1]
        if(circle[2][0] < 1)
        {
            circle_effects.pop(i)
        }
        else
        {
            ctx.beginPath();
            // console.log(circle[4])
            // ctx.strokeStyle=circle[4];
            // console.log(ctx.strokeStyle);    
            ctx.arc(circle[0][0],circle[0][1]-offset, circle[1] ,0,Math.PI*2);
            ctx.stroke();
        }
    }
}
// for i, circle in sorted(enumerate(circle_effects), reverse=True): # loc, radius, border_stats, speed_stats, color
//         circle[1] += circle[3][0]
//         circle[2][0] -= circle[2][1]
//         circle[3][0] -= circle[3][1]
//         if circle[2][0] < 1:
//             circle_effects.pop(i)
//         else:
//             pygame.draw.circle(display, circle[4], [int(circle[0][0]), int(circle[0][1] - scroll)], int(circle[1]), int(circle[2][0]))
circle_effects.push([(0,400), 500, [500, 0.15], [10, 0.2], "#be2864"])
circle_effects.push([(0,400), 500, [500, 0.05], [5, 0.04], "#be2864"])
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)
    run()
    // ctx.beginPath()
    ctx.strokeStyle="#be2864"
    // ctx.arc(100,100,200,0,Math.PI*2)
    // ctx.stroke()
}
// screen_shake = 12
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return { x: x, y: y };
}
canvas.addEventListener("mousedown", function (e) {
    circle_effects.push([[0,400 + offset], 250, [250, 0.2], [4, 0.3], "#000"])
    circle_effects.push([[0,400 + offset], 50, [250, 0.2], [4, 0.3], "#000"])
    circle_effects.push([[0,400 + offset], 100, [250, 0.2], [4, 0.3], "#000"])
//     t = getMousePosition(canvas, e);
//     // line.addPoint(t.x, t.y + ball.offset);
//     circle_effects.push([[t.x, t.y + offset], 4, [4, 0.2], [4, 0.3], "#000"])
});
animate()