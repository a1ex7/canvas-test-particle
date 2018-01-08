var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var opt = {
  width: 800,
  height: 800,
  background: 'rgb(29, 30, 33)',
  speed: 3,
  count: 300,
  radius: 4,
};

var w = ctx.canvas.width = window.innerWidth;
var h = ctx.canvas.height = window.innerHeight;
var particles = [];

Particle = function(x, y) {

  this.x = x || 0;
  this.y = y || 0;
  this.r = opt.radius;
  this.angle = rnd(360);
  this.dx = Math.cos(this.angle);
  this.dy = Math.sin(this.angle);
  this.speed = opt.speed;
  this.color = getRndColor();

  this.update = function() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
  }

  this.reflect = function() {
    if (this.x > w || this.x < 0) { this.dx = -this.dx; }
    if (this.y > h || this.y < 0) { this.dy = -this.dy; }
  }

  this.setVector = function(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r,0,2*Math.PI);
    ctx.fill();
  }

  return this;
}



function setup() {
  for (var i = 0; i < opt.count; i++) {
    particles.push(new Particle(rnd(w), rnd(h)));
  }
};

setup();

function reflectFromNear(particle) {
  var x = particle.x;
  var y = particle.y;
  for (var i = 0; i < particles.length; i++) {
    var distanse = Math.sqrt(Math.pow(x - particles[i].x, 2) + Math.pow(y - particles[i].y, 2))
    if (distanse < opt.radius*2 && distanse != 0) {
      particle.dx = -particle.dx;
      particle.dy = -particle.dy;
    }
  }

}

function loop() {

  ctx.fillStyle = opt.background;
  ctx.fillRect(0, 0, w, h);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].reflect();
    particles[i].draw();

    reflectFromNear(particles[i]);
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);


function rnd(value) {
  return Math.random() * value;
}

function getRndColor() {
  var r = 255*Math.random()|0,
      g = 255*Math.random()|0,
      b = 255*Math.random()|0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}