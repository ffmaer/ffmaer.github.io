function setup() {
 	createCanvas(displayWidth, displayHeight);
	strokeWeight(10)
	stroke(0);
    background("black")

}

function touchMoved() {
  stroke(random(["white","cyan","magenta","yellow"]))
  strokeWeight(3)
	line(mouseX, mouseY, pmouseX, pmouseY);
	return false;
}