function setup() {
 	createCanvas(window.innerWidth, window.innerHeight);
	strokeWeight(10)
	stroke(0);
    background("black")

}

function touchMoved() {
  stroke(random(["white","cyan","magenta","yellow"]))
  strokeWeight(5)
	line(mouseX, mouseY, pmouseX, pmouseY);
	return false;
}