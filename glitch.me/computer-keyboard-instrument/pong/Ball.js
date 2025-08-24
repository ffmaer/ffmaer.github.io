class Ball {
  constructor(r, hit_msg) {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.r = r;
    this.hit_msg = hit_msg;
    this.last_hit = -10000;
    this.reset();
  }

  checkPaddleLeft(p) {
    if (
      this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x - this.r < p.x + p.w / 2
    ) {
      if (this.x > p.x) {
        //hit, assign new speed
        let diff = this.y - (p.y - p.h / 2);
        let rad = radians(45);
        let angle = map(diff, 0, p.h, -rad, rad);
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x + p.w / 2 + this.r;
        this.last_hit = millis();
      }
    }
  }
  checkPaddleRight(p) {
    if (
      this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x + this.r > p.x - p.w / 2
    ) {
      if (this.x < p.x) {
        // hit, assign new speed
        let diff = this.y - (p.y - p.h / 2);
        let angle = map(diff, 0, p.h, radians(225), radians(135));
        this.xspeed = 5 * cos(angle);
        this.yspeed = 5 * sin(angle);
        this.x = p.x - p.w / 2 - this.r;
        this.last_hit = millis();
      }
    }
  }

  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    let angle = random(-PI / 4, PI / 4);
    this.xspeed = 5 * Math.cos(angle);
    this.yspeed = 5 * Math.sin(angle);

    if (random(1) < 0.5) {
      this.xspeed *= -1;
    }
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }

    if (this.x - this.r > width) {
      // ding.play();
      leftscore++;
      this.reset();
    }

    if (this.x + this.r < 0) {
      // ding.play();
      rightscore++;
      this.reset();
    }
  }
  show() {
    if (debug) {
      fill(255, 32);
      ellipse(this.x, this.y, this.r * 2);
    }
    
    if (millis() - this.last_hit < 1000) {
      // it it was hit within x second, draw speech bubble

      push();
      let t_size = 24;
      let padding = 5;
      textSize(t_size);
      let w = textWidth(this.hit_msg);
      stroke("black");
      fill("white");
      rectMode(CENTER);
      rect(this.x + 20, this.y - 20, w + padding * 2, t_size + padding * 2, 10);
      fill("black");
      noStroke();
      textAlign(CENTER, CENTER);
      text(this.hit_msg, this.x + 20, this.y - 20);
      pop();
    }
  }
}
