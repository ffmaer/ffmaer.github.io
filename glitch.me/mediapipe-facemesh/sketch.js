let capture;
let past_predictions = [];

function setup() {
  createCanvas(640, 480);
  stroke("White");
  capture = createCapture(VIDEO, function(){
    console.log("capture created")
    document.querySelector("video").onloadeddata = function(){
      console.log("onloadeddata");
      bundle.main();
    }
  })
  capture.hide();
}

function draw() {
  if(bundle.predictions != null){
    if (bundle.predictions.length > 0) {
      background("Black");
      past_predictions.push(bundle.predictions);
      if(past_predictions.length > 10){
        past_predictions.shift();
      }
      for( let i = 0;i< past_predictions.length;i++){
        let current_prediction = past_predictions[i];
        for (let j = 0; j < current_prediction.length; j++) {
          keypoints = current_prediction[j].scaledMesh;
          if(keypoints.length > 0){
            for (let k = 0; k < keypoints.length; k++) {
              const [x, y, z] = keypoints[k];
              point(-x+width,y,z);
            }
          }
        }
      }
    }
    bundle.predictions = null;
    bundle.main();
  }
}