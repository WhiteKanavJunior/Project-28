const { Engine, World, Bodies, Body, Mouse, MouseConstraint, Constraint, Composite, Detector } = Matter;

var engine;
var world;

var stones = [];
var rock;

var string;

var state = 0;

function setup() {
  createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  rock = new Rock(300, 300, 25);
  string = new String(rock.rock, { x: 300, y: 300 });
}

function draw() {
  background(0);
  Engine.update(engine);

  rock.display();
  string.display();

  noStroke();
  fill(255);
  textFont("Verdana");
  textSize(18);
  text("Drag the mouse to aim the ball", 500, 80);
  text("Release the mouse to launch it", 505, 100);
  text("Press Space to reload", 525, 120);

}

function mouseDragged() {
  if (state == 0) {
    Matter.Body.setPosition(rock.rock, { x: mouseX, y: mouseY });
    Matter.Body.setStatic(rock.rock, false);
  }
}

function mouseReleased() {
  if (state == 0) {
    string.shoot();
    state = 1;
  }
}

function keyPressed() {
  if (keyCode == 32 && state == 1) {
      string.reload();
      state = 0;
    string.stiffness = 1;
  }
}