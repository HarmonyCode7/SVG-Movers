
let dx = 2;
let dy = 2;
function autorun()
{
    let svgCanvas = new Parent(document.querySelector('.svg-canvas'));
    let c = new Circle(new Point(50,50), 20);
    let circle = c.DrawCircle({fill: "green", stroke: "red"});
    console.log(circle.cx.baseVal.value);
    svgCanvas.Append(circle);
    let movecircle = window.setInterval(function ()
    {
        MoveCircle(svgCanvas,circle,dx,dy);
        console.log(circle.cx.baseVal.value);
    }, 60)

    //cancelAnimationFrame(movecircle);
}

function MoveCircle(world,circle, x,y)
{
    //

    let width = world.parent.clientWidth;
    let height = world.parent.clientHeight;
    let radius = world.Radius;
    if(circle.cx.baseVal.value  + x> 200 || x + circle.cx.baseVal.value < 20)
    {
        circle.cx.baseVal.value -= 5;
        
    }
    if(circle.cy.baseVal.value + y > 210 || y + circle.cy.baseVal.value < 20)
    {
        circle.cy.baseVal.value -= 5;
    }
    console.log(x);
    console.log(y);
    circle.cx.baseVal.value += x;
    circle.cy.baseVal.value += y;
}

function Parent(parent)
{
    this.parent = parent;
    this.Append = function (child)
    {
        this.parent.appendChild(child);
    }
}

function Point(x,y)
{
    this.X = x;
    this.Y = y;
}

function Circle(centre, radius)
{
    this.Centre = centre;
    this.Radius = radius;
    
    this.CircleAttributes = {
        cx: centre.X, cy: centre.Y, r: this.Radius, 
    }
    this.DrawCircle = function (css)
    {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ApplyAttributes(circle,this.CircleAttributes);
        ApplyAttributes(circle,css);
        return circle;
    }
}

function ApplyAttributes(htmlElement,attributes)
{
    for(let property in attributes)
    {
        htmlElement.setAttributeNS(null,property, attributes[property]);
    }
}
if (document.addEventListener) document.addEventListener("DOMContentLoaded", autorun, false);
else if (document.attachEvent) document.attachEvent("onreadystatechange", autorun);
else window.onload = autorun;