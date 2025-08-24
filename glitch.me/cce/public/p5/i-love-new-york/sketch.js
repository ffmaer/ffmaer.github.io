var of;
var s=["i","love","new","york"];

function ftext(fountain, particle) {
  stroke(fountain.colors[Math.floor(particle.life*fountain.colors.length)]);
  noFill();
  textSize(particle.partSize);
  text(s[particle.id%s.length], particle.location.x, particle.location.y);
}

function setup() {
    createCanvas(1280, 720);
    var t =
    {
        name: "test",
        shape: "text",
        colors: ["Yellow","DeepPink"],
        lifetime: 600,
        angle: [250, 290],
        size: [8, 32],
        dxy: [0.1, 0.5],
        x: 0.5,
        y: 1,
        speed: 2,
        rate: [200,0.1,200,1]
    };
    Fountain_display("text", ftext); //set draw function based on shape name
    of = new Fountain(null, t);
}

function draw() {
  background(0);
  of.Draw();
  of.CreateN();
  of.Step();
  noStroke();
  fill(255);
  textSize(16);
  // text(of.length, width/2, 20);
  stroke(0);
}

