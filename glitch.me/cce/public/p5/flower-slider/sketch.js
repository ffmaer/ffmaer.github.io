let slider1;
let slider2;
function setup() {
  createCanvas(400, 400);
  frameRate(10);
  slider1 = createSlider(1,100,50);
  slider2 = createSlider(1,100,50);
}

function draw() {
  angleMode(DEGREES);
  translate(200,200);
  let val1 = slider1.value();
  let val2 = slider2.value();
  rotate(frameCount * val1);
	rect(val2,val2,50,50);
}