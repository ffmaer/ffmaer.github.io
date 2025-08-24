define(["app/env"],function(env){
	var seq = env.getSeq();

	window.addEventListener("keydown", keydown, false);
	window.addEventListener("click", click, false);

	function keydown(e) {
		env.setClickSomeWhereTextShow(false);
		var code = e.keyCode;
		// e.preventDefault();
		// console.log(code);
		if((code+"").match(/68|65|83|87/)){
			// only respond to direction keys

			if(seq.length > 1){

			// the cat is longer than its head
			// right
			// left
			// down
			// up
				if(	seq[1].x > seq[0].x && code == 68 ||
						seq[1].x < seq[0].x && code == 65 ||
						seq[1].y > seq[0].y && code == 83 ||
						seq[1].y < seq[0].y && code == 87 ){
					// can't go up when it's going down
					//do nothing
				}else{
					env.setDirect(code);
				}
			}else{
				env.setDirect(code);
			}
		}else if ((code+"").match(/39/)){//right
			env.setLine(env.getLine()+1);
		}else if ((code+"").match(/37/)){//left
			env.setLine(env.getLine()-1);
		}else if ((code+"").match(/13/)){//enter
			if(env.getGreenLight()){
				if(env.getGameOver() || env.isWon()) env.restart();
				env.setPause(false);	
			}
		}
	}
	function click(){
		env.setClickSomeWhereTextShow(false);
	}       
});