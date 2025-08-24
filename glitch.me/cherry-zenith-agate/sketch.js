// source: https://github.com/lmccart/gswp5.js-code/blob/master/05_Response/Ex_05_04.js
// diameter variable
// relative sizes
// relative positions
// 2D primitives arc() ellipse() circle() line() point() quad() rect() square() triangle()
// random diameter
// random colors

let c1, x;
function setup() {
  createCanvas(1920, 1080);
  background("grey");
  noStroke();
  c1 = random(0, 255); //Eaden
  x = 0;
}
function draw() {
  fill(0, 255, 100);
  circle(960, 540, 50); //TC
  fill("#48bfe3");
  arc(800, 800, 500, 500, 0, PI + QUARTER_PI, PIE); //Nightray(180,180+45)

  fill(100, 200, 0);
  noStroke();
  triangle(100, 300, 200, 200, 400, 800); //Jiarui

  textSize(100);
  fill(0, 102, 153);
  text("Helloよろしく尾根後안녕하세요", 100, 200); // MJ

  //Zhiyi
  stroke(125, 20, 198);
  ellipseMode(CENTER);
  arc(900, 500, 1000, 1000, 0, HALF_PI, OPEN);

  // Irene
  fill("white");
  circle(50, 50, 20);

  //Eaden
  fill(c1, c1, c1, 90);
  noStroke();
  ellipse(mouseX, mouseY, 30);

  //Doris
  fill("Green");
  noStroke();
  triangle(300, 500, 700, 350, 550, 750);

  //Jason
  if (mouseIsPressed) {
    fill("#ff0000");
  } else {
    fill("#0000FF");
  }
  circle(500, 500, 1000);

  fill(200, 230, 250);
  circle(500, 700, 180);
  stroke(300, 500, 750);
  line(350, 100, 700, 800); //younghyun

  fill("white");
  square(30, 40, 55, 20); //Anora

  fill(239, 198, 180); //Elaine
  noStroke();
  circle(300, 300, 200);

  //Leila
  fill(127, 0, 0);
  square(30, 20, 55, 20, 15, 10, 5);

  //christy
  noStroke();
  fill("magenta");
  square(150, 200, 500);

  drawAllen();
  drawWW();

  //stella
  fill("white");
  circle(80, 80, 60);

  //Una
  fill("red");
  square(300, 300, 300);
}

function drawAllen() {
  push();
  fill("brown");
  angleMode(DEGREES);
  translate(50, 50);
  rotate(x);
  ellipse(0, 0, 100, 250);
  x++;
  pop();
} //allen

//WW
function drawWW() {
  fill(230, 220, 230);
  square(230);
}
