var bg;

var xpos;
var ypos;
var xdir;
var ydir;

var scale;

var sound;
var amplitude;

var max;

function preload(){
  sound = loadSound('assets/Fur-Elise.mp3');
}


function setup(){
  createCanvas(windowWidth, windowHeight);
  xpos=0;
  ypos=0;
  xdir = 1;
  ydir = 1;
  background('#f1f1f1');
  
  sound.play();
  amplitude = new p5.Amplitude();
  
  max = 0;
}



function draw(){
  var level = amplitude.getLevel();
  if(level > max){
    max = level;
    console.log(max);
  }
  var max_scale = 50;
  scale = map(level,0,0.3,0,max_scale);
  var color = '#f1f1f1';
  
  if(scale > max_scale/7*1){
    color = '#ea4844';
  }
  if(scale > max_scale/7*2){
    color = '#f46e28';
  }
  if(scale > max_scale/7*3 ){
    color = '#f6b82b';

  }
  if(scale > max_scale/7*4 ){
    color = '#c55ba8';
  }
  if(scale > max_scale/7*5 ){
    color = '#4dc7f6';
  }
  if(scale > max_scale/7*6 ){
    color = '#3ac471';
  }

  fill(color);
  stroke(color);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#f1f1f1');
}