let bubbles;
let s=["฿","☀","☁","☾"];

function ftext(fountain, particle) {
  stroke(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  noFill();
  textSize(particle.partSize);
  text(s[particle.id%s.length], particle.location.x, particle.location.y);
}

function setup() {
    createCanvas(windowWidth/2, windowHeight);
    let t =
    {
        name: "test",
        shape: "text",
        colors: ["#AE57FF"],
        lifetime: 100,
        angle: [200, 340],
        size: [50, 50],
        dxy: [0.5, 0.5],
        x: 0.5,
        y: 0.5,
        speed: 2,
        gravity: 0,
        rate: [0,0.1]
    };
    Fountain_display("text", ftext); 
    bubbles = new Fountain(null, t);
}

function draw() {
  background("blueviolet")
  bubbles.Draw();
  bubbles.CreateN();
  bubbles.Step();
  noStroke();
  fill(255);
  textSize(16);
  stroke(0);
}