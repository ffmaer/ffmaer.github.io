let mySound;
let slider;
let p;
function preload(){
	soundFormats("wav");
	mySound = loadSound("./sounds/suspense.wav");
  
}

function setup() {
  mySound.playMode("untilDone");
  mySound.rate(0.5);
  mySound.setLoop(true);
  mySound.play();

  createCanvas(100, 100);
  background(0);
  createElement("br")
  
  p = createP("rate: 0.5");
  createElement("br")

  slider = createSlider(1,100,50);
  slider.value(25);
  slider.style("width","500px");
  createElement("br")
  
  let playBtn = createButton('Play');
  playBtn.mousePressed(function(){mySound.play()});
  playBtn.position(120, 20);
  let stopBtn = createButton('Stop');
  stopBtn.mousePressed(function(){mySound.stop()});
  stopBtn.position(140, 40);
  let pauseBtn = createButton('Pause');
  pauseBtn.mousePressed(function(){mySound.pause()});
  pauseBtn.position(160, 60);
}

function draw(){
  slider.changed(function(){
    let val = slider.value()/10;
    if(val<5){
      val = val/5;
    }
    if(val>=5){
      val = val - 4
    }
    p.html(`rate: ${val.toFixed(2)}`);
    mySound.rate(val);
  })
}
