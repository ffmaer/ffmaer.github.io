define(function () {
  //import bird wing sounds
	var wings = [];
	for(i=0;i<4;i++){
		var wing = new Audio("sounds/wing"+i+".wav");
		wings.push(wing);
	}

	//import ding sounds
	var dings = [];
	for(i=0;i<3;i++){
		var ding = new Audio("sounds/ding"+i+".wav");
		dings.push(ding);
	}

	//import cat miao sounds
	var miao = new Audio("sounds/miao.wav");

	//import crowd cheer sound
	var crowd_cheer = new Audio("sounds/crowd-cheer.wav");

	//import click sounds
	var click = new Audio("sounds/click.wav");
	var complete = new Audio("sounds/complete.wav");
  return {
    wingSound: function(){
			var rnd = Math.random();
			if(rnd < 0.8){
				wings[0].cloneNode(true).play();
			}else if(rnd < 0.9){
				wings[1].cloneNode(true).play();
			}else if(rnd < 0.95){
				wings[2].cloneNode(true).play();
			}else{
				wings[3].cloneNode(true).play();
			}
    },
		dingSound: function (scores, scores_goals, category, manwoman){
			if(scores[category][manwoman]==scores_goals[category][manwoman]){					
				var rnd = Math.random();
				if(rnd < 0.33){
					dings[0].cloneNode(true).play();
				}else if(rnd < 0.66){
					dings[1].cloneNode(true).play();
				}else{
					dings[2].cloneNode(true).play();
				}
			}
		},
		miaoSound: function(){
			miao.cloneNode(true).play();
		},
		completeSound:function(){
			complete.cloneNode(true).play();
		},
		crowCheerSound: function(){
			crowd_cheer.cloneNode(true).play();
		},
		clickSound: function(){
			click.cloneNode(true).play();
		}
  }
});