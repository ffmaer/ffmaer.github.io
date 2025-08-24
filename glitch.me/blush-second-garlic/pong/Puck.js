class Puck extends Ball {
  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
    super.show();
  }
}
