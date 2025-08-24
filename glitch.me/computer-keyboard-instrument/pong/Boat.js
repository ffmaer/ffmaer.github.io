class Boat extends Ball {
  //tc
  constructor(r, s, c1, c2,hit_msg) {
    super(r,hit_msg);
    this.s = s;
    this.c1 = c1;
    this.c2 = c2;
  }
  show() {
    push();
    rectMode(CORNER);
    translate(this.x, this.y);
    scale(this.s);
    translate(-220, -150);
    fill(this.c1);
    triangle(212, 22, 64, 231, 206, 232); // left sail
    rect(216, 17, 11, 246); // pole
    fill(this.c2);
    triangle(236, 26, 348, 239, 231, 230); // right sail
    quad(50, 253, 368, 257, 316, 300, 86, 302); // body
    pop();
    super.show();
    
  }
}
