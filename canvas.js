var canvas = document.getElementById('Canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

//solid rectangle
/*ctx.fillStyle = "#ff0000";
ctx.fillRect(100, 100, 100, 100);

//stroke means a line
ctx.strokeStyle = "#ff0000";
ctx.beginPath();
ctx.beginPath();
ctx.moveTo(40, 40);
ctx.lineTo(40, 100);
ctx.stroke();



//multiple circles using for loop
for (var i = 0; i < 1000; i++) {
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    ctx.strokeStyle = getRandomColor();
    ctx.stroke();
}


//Random color generator
function getRandomColor() {
    var varters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += varters[Math.floor(Math.random() * 16)];
    }
    return color;
}*/

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = ["#ffaa33", "#99ffaa", "#ff0000", "#96adc8", "#098345"];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function () {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;


    this.draw = function () {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = this.color;
    }
    this.update = function () {

        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }


        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 3000; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var color = colorArray[Math.floor(Math.random() * (colorArray.length))];
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

//creating an arc or circle
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();
init();