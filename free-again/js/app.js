requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl: 'js/lib',
		//except, if the module ID starts with "app",
		//load it from the js/app directory. paths
		//config is relative to the baseUrl, and
		//never includes a ".js" extension since
		//the paths config could be for a directory.
		paths: {
				app: '../app'
		}
});

// Start the main app logic.
requirejs(['jquery', 'app/sound', 'app/draw', 'app/env', 'app/listener', "app/footer"],
function   ($, sound, draw, env, listener, footer) {
	//jQuery and the app/sub module are all
	//loaded and can be used here now.
	$(document).ready(function(){
		
		var margins = env.getMargins();
		var scale = env.getScale();
		var col = env.getCol();
		var row = env.getRow();
		var seq = env.getSeq();
		var available = env.getavailable();
		var tunnels = env.getTunnels();
		var shapes = env.getShapes();
		var scores = env.getScores();
		var scores_goals = env.getScoresGoals();
		var food = env.getFood();

		$("#canvas").attr("width", margins['left']+ scale* col+ margins['right']);
		$("#canvas").attr("height", margins['top']+ scale* row+ margins['bottom']);
		






		//the start of the interval
		var global_frame = 0;
		var time1 = setInterval(function(){

			var text = env.getText();
			if(text.indexOf("-->") > -1){
				env.setGreenLight(true);
			}else{
				env.setGreenLight(false);
			}



			if(!env.getGameOver()){
				if(env.isWon()){
					if(!env.getWinSoundPlayed()){
						if(env.isAllChallengesCompleted()){
							sound.crowCheerSound();
						}else{
							sound.completeSound();
						}
						env.setWinSoundPlayed(true);
					}
				}else if(!env.getPause() && env.getGreenLight()){

					var last_x = seq[seq.length-1].x;
					var last_y = seq[seq.length-1].y;
					var last_shape = seq[seq.length-1].shape;

					//move 1 step forward, the tail becomes empty
					env.availableListAdd(last_x,last_y)

					// move forward
					for(i=seq.length-1;i>0;i--){
						seq[i].x=seq[i-1].x;
						seq[i].y=seq[i-1].y;
					}
					
					switch(env.getDirect()) {
						case 65:
								seq[0].x -= 1;//left
								break;
						case 87:
								seq[0].y -= 1;//up
								break;
						case 68:
								seq[0].x += 1;//right
								break;
						case 83:
								seq[0].y += 1;//down
								break;
					}
					


					
					for(var i=0;i<tunnels.length;i++){
						//swtich on the tunnel for removeing one node when the cat head enters
						if(tunnels[i].x == seq[0].x && 
							tunnels[i].y == seq[0].y){
							tunnels[i].swtich = 1;
							}
						//any node hit any tunnel?
						for(var j=0; j<seq.length; j++){
							if(tunnels[i].x== seq[j].x && 
								tunnels[i].y == seq[j].y && 
								tunnels[i].swtich == 1 &&
								tunnels[i].shape == seq[j].shape){


								last_x = seq[seq.length-1].x;
								last_y = seq[seq.length-1].y;
								
								//tail, move 1 step forward again
								//move 1 step forward, the tail becomes empty, or becomes the tunnel

								env.availableListAdd(last_x,last_y)
					
								// since one node is cut, move the body one step forward
								for(var a=seq.length-1;a>j;a--){
									seq[a].x=seq[a-1].x;
									seq[a].y=seq[a-1].y;
								}

								// update the score

								var category = shapes[seq[j].shape].category;
								var manwoman = shapes[seq[j].shape].manwoman;

								
								scores[category][manwoman]--;
								sound.dingSound(scores, scores_goals[env.getChallengeIndex()], category, manwoman);

								seq.splice(j,1);

								sound.clickSound();
								tunnels[i].swtich = 0;
								break;
							}
						}
					}//tunnels

					if(seq[0].x<0 || seq[0].x>=col || seq[0].y < 0 || seq[0].y >= row){
						// hit the wall, game over
						sound.miaoSound();
						env.setGameOver(true);
					}
					for(i=1;i<seq.length;i++){
						if(seq[0].x == seq[i].x && seq[0].y == seq[i].y){
							// hit itself, game over
							sound.miaoSound();
							env.setGameOver(true);
						}
					}
					var noFoodEaten = true;
					for(i=0;i<food.length;i++){
						
						// some food eaten
						if(seq[0].y == food[i].y && seq[0].x == food[i].x){
							sound.wingSound();

							// the newly eaten is appened to the tail
							seq.push({x:last_x,y:last_y,shape:food[i].shape})

							
							//if it is food, then it is still not empty, and the tail becomes occupied
							env.availableListRemove(last_x,last_y);
							//wall is never in the empty list
							//if it is its body, it is still not empty, 

							//update scores
							var category = shapes[food[i].shape].category;
							var manwoman = shapes[food[i].shape].manwoman;
							scores[category][manwoman]++;
							sound.dingSound(scores, scores_goals[env.getChallengeIndex()], category, manwoman);

							//play animation
							var frame = 1;
							var total_frames = 10;
							var interval = 50;

							var spark_x = margins["left"]+food[i].x*scale+scale/2;
							var spark_y = margins["top"]+food[i].y*scale+scale/2;
							var shape_i = food[i].shape;

							var animate = setInterval(function(){
								draw.drawSpark(spark_x, spark_y, shape_i, frame);
								frame++;
							}, interval);

							setTimeout(function(){
								clearInterval(animate);
							},total_frames*interval);


							//put back the available space
							var release_x = food[i].x;
							var release_y = food[i].y;

							//generate new food on an available place
							var result = env.availableListPop();

							food[i].x = result.x;
							food[i].y = result.y;

							noFoodEaten = false;
							break;
						}else{
							//no food eaten
						}
					}
					//if the space is empty, then cat head make it no longer empty
					if(noFoodEaten){
						env.availableListRemove(seq[0].x,seq[0].y);	
					}
				}//not paused
	
			}						

			draw.draw(global_frame);
			global_frame ++;
			//reset
			if(global_frame > 10000000){
				global_frame = 0;
			}
		},200);
	
		
		function showNotification(){

		}
		
	});//document ready
});