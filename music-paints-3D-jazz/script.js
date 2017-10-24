var bg;

var xpos;
var ypos;
var zpos;

var xdir;
var ydir;
var zdir;


var sound;
var amplitude;

var max;

var boxX = 1000;
var boxY = 618;
var boxZ = 500;

function preload(){
  sound = loadSound('assets/jazz.mp3');
}


function setup(){
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);

  cnv.mouseClicked(function() {
    if (sound.isPlaying() ){
      sound.stop();
    } else {
      sound.play();
    }
  });

  fft = new p5.FFT();
  camera(200, -800, 1200, 0, 0, 0, 0, 1, 0);

  xpos=0;
  ypos=0;
  zpos=0;


  xdir = 1;
  ydir = 1;
  zdir = 1;
  background("rgba(206,179,150,1)");
  
  sound.play();
  amplitude = new p5.Amplitude();
  
  max = 0;

  noFill();
  strokeWeight(10);
  stroke("rgba(40,40,40,1)");
  box(boxX,boxY,boxZ);
}



function draw(){
  
  var level = amplitude.getLevel();

  var max_scale = 40;
  var scale = map(level,0,0.3,0.1,max_scale);
  var alpha = 0.7;
  var color="rgba(80,114,160,"+alpha+")";//blue

  if(scale > max_scale/5*1 ){
    color="rgba(18,19,14,"+alpha+")";//black
  }
  if(scale > max_scale/5*2 ){
    color="rgba(186,170,85,"+alpha+")";
  }
  if(scale > max_scale/5*3 ){
    color="rgba(191,85,63,"+alpha+")";//red
  }
  if(scale > max_scale/5*4 ){
    color="rgba(221,212,197,"+alpha+")";
  }


  fill(color);
  noStroke();

  var step_len = 10+scale/2;

  xpos += xdir*step_len;
  ypos += ydir*step_len;
  zpos += zdir*step_len;

  translate(xpos,ypos,zpos);  
  sphere(10+scale);


  var margin = 30;
  if(xpos > boxX/2-margin || xpos < -boxX/2+margin){
    xdir *= -1;
  }
  if(ypos > boxY/2-margin || ypos < -boxY/2+margin){
    ydir *= -1;
  }
  if(zpos > boxZ/2-margin || zpos < -boxZ/2+margin){
    zdir *= -1;
  } 
}
