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
  sound = loadSound('assets/Fur-Elise.mp3');
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
  
  camera(200, -800, 1200, 0, 0, 0, 0, 1, 0);

  xpos=0;
  ypos=0;
  zpos=0;


  xdir = 1;
  ydir = 1;
  zdir = 1;
  background('#f1f1f1');
  
  sound.play();
  amplitude = new p5.Amplitude();
  
  max = 0;

  noFill();
  strokeWeight(10);
  stroke("#e1e1e1");
  box(boxX,boxY,boxZ);
}



function draw(){
  
  var level = amplitude.getLevel();

  var max_scale = 30;
  var scale = map(level,0,0.3,0.1,max_scale);
  var alpha = 0.7;
  // var color = '#ea4844';
  var color="rgba(236,81,81,"+alpha+")";

  if(scale > max_scale/6*1 ){
    // color = '#f46e28';
    color="rgba(244,111,41,"+alpha+")";
  }
  if(scale > max_scale/6*2 ){
    // color = '#f6b82b';
    color="rgba(247,184,43,"+alpha+")";
  }
  if(scale > max_scale/6*3 ){
    // color = '#c55ba8';
    color="rgba(79,201,246,"+alpha+")";
  }
  if(scale > max_scale/6*4 ){
    // color = '#4dc7f6';
    color="rgba(196,91,168,"+alpha+")";
  }
  if(scale > max_scale/6*5 ){
    // color = '#3ac471';
    color="rgba(58,196,113,"+alpha+")";
  }

  fill(color);
  noStroke();

  var step_len = 10+scale/2;

  xpos += xdir*step_len;
  ypos += ydir*step_len;
  zpos += zdir*step_len;

  translate(xpos,ypos,zpos);  
  sphere(scale);


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
