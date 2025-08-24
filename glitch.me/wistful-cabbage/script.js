var bg;

var xpos;
var ypos;
var xdir;
var ydir;

var scale;

var sound;
var amplitude;

function preload(){
  sound = loadSound('https://cdn.glitch.com/0dcbafd9-b84c-436a-a2d1-4ccbfd636b7e%2FFur%20Elise.mp3?1508675064184');
}

function settings(){
  bg = loadImage("https://cdn.glitch.com/0dcbafd9-b84c-436a-a2d1-4ccbfd636b7e%2FwindowsDesktop.jpg?1508675596549");
  createCanvas(bg.width, bg.height);
  xpos=0;
  ypos=0;
  xdir = 1;
  ydir = 1;
}

function setup(){
  background(bg);
  
  sound.play();
  amplitude = new p5.Amplitude();
  

}

function draw(){
  var level = amplitude.getLevel();

  scale = map(level,0,0.3,1,100);
  ellipse(xpos,ypos,scale,scale);
  xpos += xdir*10;
  ypos += ydir*10;
  
  if(ypos > height || ypos < 0){
    ydir *= -1;
  }
  if(xpos > width || xpos < 0){
    xdir *= -1;
  }
  
  
}