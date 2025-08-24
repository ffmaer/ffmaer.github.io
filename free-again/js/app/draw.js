define(["app/env"],function (env) {
	var context = env.getContext();
	var margins = env.getMargins();
	var scale = env.getScale();
	var col = env.getCol();
	var row = env.getRow();
	var seq = env.getSeq();
	var tunnels = env.getTunnels();
	var shapes = env.getShapes();
	var scores = env.getScores();
	var scores_goals = env.getScoresGoals();
	var max_score = env.getMaxScore();
	var food = env.getFood();
	var challenges_completed = env.getChallengesCompleted();
	var border_thickness = env.getBorderThickness();
	//defined in this module
	var the_blue = '#5aa6d7';
	var the_yellow = '#e1b923';
	var the_purple = '#af59a2';
	var the_orange = '#f15c22';
	var the_white = '#f7f5e6';
	var the_background = '#2b263c'

	function drawClickSomeWhereText(){
		context.beginPath();
		var x = margins["left"]+scale*col/2;
		var y = margins["top"]+scale*row/2;
		context.fillStyle = the_white;
		context.font = scale/2+"px Actor";
		var text= "If the keyboard is not responsive, please click somewhere";
		var width = context.measureText(text).width;
		x = x-width/2;
		context.globalAlpha = 0.5;
		context.fillText(text,x,y);
		text = "so the game interface is in focus.";
		var x = margins["left"]+scale*col/2;
		var width = context.measureText(text).width;
		x = x-width/2;
		y=y+scale/4*3;
		context.fillText(text,x,y);
		context.globalAlpha = 1;
	}

	function drawPressText(press_text, width, x, y, global_frame){
		context.fillStyle = the_white;	
		if(press_text.flash){
			if(global_frame % 10 < 5){
				context.fillStyle = the_yellow;	
			}
		}
		
		context.font = scale*0.5+'px Actor';
		context.fillText(press_text.text,x+width+scale*0.4, y);
	}

	function drawInstructions(global_frame){
		
		context.beginPath();
		// measure text
		var text = env.getText();
		var x = margins["left"];
		var y = margins["top"]/3+scale*0.5;

		//draw main text
		context.fillStyle = the_blue;
		if(text.indexOf("Challenge")>-1){
			context.fillStyle=the_yellow;
		}

		context.textBaseline = "bottom";
		context.font = scale*0.5+'px Actor';
		

		//draw press text
		var press_text_arr = [];

		if(text.indexOf("-->")>-1){
			text = text.replace("-->","");
			var flash = ( env.getGreenLight() && ( env.getPause() || env.getGameOver() ) );
			press_text_arr.push({text:"start: press enter",flash:flash});
		}

		if(text.indexOf("useArrows")>-1){
			text = text.replace("useArrows","");
			press_text_arr.push({text:"direct the cat: use ASDW keys",flash:false});
		}		

		if(text.indexOf(">>>")>-1){
			text = text.replace(">>>","");
			var flash = ( env.getGreenLight() && env.isWon() );
			press_text_arr.push({text:"next: →",flash:flash});
		}

		if(text.indexOf(">>")>-1){
			text = text.replace(">>","");
			var flash = ( env.getGreenLight() && env.isWon() );
			press_text_arr.push({text:"next: press keyboard →",flash:flash});
		}

		if(text.indexOf("<<")>-1){
			text = text.replace("<<","");
			press_text_arr.push({text:"previous: ←",flash:false});
		}

		var width = context.measureText(text).width;
		context.fillText(text, x, y);

		press_text_arr.forEach(function(press_text){

			drawPressText(press_text, width, x, y, global_frame);
			width = width + context.measureText(press_text.text).width+0.6*scale;
		});

	
	}



	function drawNotification(text){
		var x = margins["left"];
		var y = margins["top"]/3*2+scale*0.4;
		context.textBaseline = "bottom";
		context.font = scale*0.4+'px Actor';
		context.fillStyle=the_white;
		context.fillText(text,x,y);
	}	
	function drawThankYou(){

		if(env.isAllChallengesCompleted()){
			var x = margins["left"] + env.getCol() * scale + scale;
			var y = margins["top"] +scale;
			x = x+5*scale*1.3+scale/3;
			y = y;
			var step = scale/3;
					
			var order = ["thank","you","for","playing","❤",""];
			var index_0 = Math.floor(Math.random()*order.length);
			var index_1 = (index_0+1)%order.length;
			var index_2 = (index_0+2)%order.length;
			context.beginPath();
			context.fillStyle = the_yellow;
			context.font = scale*0.3+'px Actor';
			context.fillText(order[index_0], x+step,y+step);
			context.fillText(order[index_1], x+2*step,y+2*step);
			context.fillText(order[index_2], x+4*step,y+step);
			
		}
	}
	function drawChallengesCompleted(){
		
		var x = margins["left"] + env.getCol() * scale + scale;
		var y = margins["top"] +scale/2;
		//label
		context.beginPath();
		context.font = scale/2+'px Actor';
		context.textBaseline="middle"; 
		context.fillStyle = the_yellow;
		context.fillText("Challenges Completed:",x,y);

		//circles & stars
		var x = margins["left"] + env.getCol() * scale + scale * 2;
		var y = margins["top"] + scale*1.5;
		var completed_count = 0;
		for(var i=0;i<challenges_completed.length;i++){
			//circles
			context.beginPath();
			context.fillStyle = the_yellow;
			var radius = scale/2;
			context.arc(x+scale*i*1.3,y,radius,0,2*Math.PI);
			context.fill();

			context.beginPath();
			context.fillStyle = "#2b263c";
			var radius = scale/2.5;
			context.arc(x+scale*i*1.3,y,radius,0,2*Math.PI);
			context.fill();

			//stars
			if(challenges_completed[i]){
				context.beginPath();
				context.fillStyle = the_yellow;
				context.textBaseline="middle"; 
				context.fillText("♪",x+scale*i*1.3-scale*0.2,y);
			}
		}

	}

	var bar_length = 160;

	function drawNonius(x,y,shape,shape_size,save_color,which,score){
		var unmodified_score = score;
		if (score > max_score ) score = max_score;

		//3 * shapesize because 1 is reserved at the beginning
		var distance = (bar_length - 3 * shape_size) * (score/max_score);

		if(shape=="circle"){
			if(which == "goal"){

				context.beginPath();
				context.arc(x+1.5*shape_size+distance,y,shape_size, 0, 2*Math.PI);
				context.fill();

				context.beginPath();
				context.fillStyle = '#2b263c';
				context.arc(x+1.5*shape_size+distance,y,shape_size/4*3, 0, 2*Math.PI);
				context.fill();

				context.fillStyle = save_color;
			}else{

				context.beginPath();
				context.arc(x+1.5*shape_size+distance,y,shape_size/4*3, 0, 2*Math.PI);
				context.fill();

			}
			
		}else if(shape=="square"){
			if(which == "goal"){
				context.beginPath();
				context.rect(x+0.5*shape_size+distance,y-shape_size,shape_size*2,shape_size*2);
				context.fill();

				context.beginPath();
				context.fillStyle = '#2b263c';
				context.rect(x+0.25*shape_size+ distance+shape_size/2,y-shape_size/4*3,shape_size*1.5,shape_size*1.5);
				context.fill();

				context.fillStyle = save_color;
			}else{
				context.beginPath();
				context.rect(x+0.25*shape_size+ distance+shape_size/2,y-shape_size/4*3,shape_size*1.5,shape_size*1.5);
				context.fill();
			}
		}

		// print the score to the noinus if it is larger than max_score
		if(which == "current" && unmodified_score > max_score){

			context.beginPath();
			context.fillStyle = '#2b263c';
			var save_font = context.font;
			context.font= shape_size*1.2+'px Actor';
			context.textBaseline = "middle"
			var measure = context.measureText(unmodified_score);
			// measure.width/2 xy at the center of the circle, align the center of the text
			// with the center of the circle
			context.fillText(unmodified_score, x+1.5*shape_size+distance-(measure.width/2),y);
			context.fillStyle = save_color;
			context.font = save_font;
		}
	}

	function drawArrow(x,y,text,shape, score, score_goal){
		var thinkness = 4;
		var Arrow_length = thinkness * 1.5;
		
		var save_color = context.fillStyle;
		var save_font = context.font;

		context.beginPath();
		context.lineCap = 'round';
		context.lineWidth = thinkness;
		context.strokeStyle = save_color;
		context.moveTo(x,y);
		context.lineTo(x+bar_length,y);
		
		context.stroke();
		context.beginPath();
		context.moveTo(x+bar_length,y-thinkness*1.5);
		context.lineTo(x+bar_length+Arrow_length, y);
		context.lineTo(x+bar_length, y+thinkness*1.5);
		context.fill();

		context.font = scale/2.5+'px Actor';
		context.fillText(text, x+bar_length+Arrow_length+Arrow_length, y);
		context.font = save_font;

		var shape_size = thinkness*3;
		

		//use circles and squares to indicate scores goals
		
		drawNonius(x,y,shape,shape_size,save_color,"goal",score_goal);

		//use circles and squares to indicate scores
		
		
		drawNonius(x,y,shape,shape_size,save_color,"current",score);
	}

	function drawCatHead(x,y){
		var head_size = Math.floor(scale/12);
		// face
		context.fillStyle = "#fe8a51";
		context.fillRect(x+2*head_size, y+3*head_size, 9*head_size, 7*head_size);

		
		// left ear
		context.fillStyle = "#ba5e2f";
		context.fillRect(x+1*head_size, y+0*head_size, head_size, head_size);
		context.fillRect(x+1*head_size, y+1*head_size, head_size*2, head_size);
		context.fillRect(x+1*head_size, y+2*head_size, head_size*3, head_size);
		// right ear
		context.fillRect(x+11*head_size, y+0*head_size, head_size, head_size);
		context.fillRect(x+10*head_size, y+1*head_size, head_size*2, head_size);
		context.fillRect(x+9*head_size, y+2*head_size, head_size*3, head_size);
		// hair
		context.fillRect(x+4*head_size, y+3*head_size, head_size*5, head_size);
		// left face
		context.fillRect(x+1*head_size, y+3*head_size, head_size, 7*head_size);
		// right face
		context.fillRect(x+11*head_size, y+3*head_size, head_size, 7*head_size);
		// jaw
		context.fillRect(x+2*head_size, y+10*head_size, 9*head_size, head_size);
		// left mustache
		context.fillRect(x+0*head_size, y+7*head_size, 1*head_size, 1*head_size);
		context.fillRect(x+0*head_size, y+9*head_size, 1*head_size, 1*head_size);
		// right mustache
		context.fillRect(x+12*head_size, y+7*head_size, 1*head_size, 1*head_size);
		context.fillRect(x+12*head_size, y+9*head_size, 1*head_size, 1*head_size);

		
		context.fillStyle = "#010000";
		if(env.getGameOver()){
			// left eye
			context.fillRect(x+2*head_size, y+4*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+4*head_size, y+4*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+3*head_size, y+5*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+2*head_size, y+6*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+4*head_size, y+6*head_size, 1*head_size, 1*head_size);
			// right eye
			context.fillRect(x+8*head_size, y+4*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+10*head_size, y+4*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+9*head_size, y+5*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+8*head_size, y+6*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+10*head_size, y+6*head_size, 1*head_size, 1*head_size);
			// nose
			context.fillRect(x+6*head_size, y+8*head_size, 1*head_size, 2*head_size);
		}else if(env.isWon()){
			// left eye
			context.fillRect(x+3*head_size, y+5*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+2*head_size, y+6*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+4*head_size, y+6*head_size, 1*head_size, 1*head_size);
			// right eye
			context.fillRect(x+9*head_size, y+5*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+8*head_size, y+6*head_size, 1*head_size, 1*head_size);
			context.fillRect(x+10*head_size, y+6*head_size, 1*head_size, 1*head_size);
			// nose
			context.fillRect(x+6*head_size, y+8*head_size, 1*head_size, 2*head_size);
		}else{
			// left eye
			context.fillRect(x+3*head_size, y+5*head_size, head_size, 2*head_size);
			// right eye
			context.fillRect(x+9*head_size, y+5*head_size, head_size, 2*head_size);
			// nose
			context.fillRect(x+6*head_size, y+8*head_size, 1*head_size, 1*head_size);
		}

	}// draw cat head

	function drawScore(fillStyle,place,category,category_short,dimensions){
		context.fillStyle = fillStyle;
		var x = margins['left'] + scale*col+scale;
		var y = margins['top'] + scale * 3.5 + (scale * 3.5 * place);
		context.fillText(category+":", x, y);

		var label = dimensions[0];
		drawArrow(x+scale,y+scale,label, "circle", scores[category_short]["woman"],scores_goals[env.getChallengeIndex()][category_short]["woman"]);

		var label = dimensions[1];
		drawArrow(x+scale,y+scale*2,label, "square", scores[category_short]["man"],scores_goals[env.getChallengeIndex()][category_short]["man"]);
	}

	function drawTunnel(x,y,color,shape){
		context.fillStyle = "#1e1e36";
		context.fillRect(x,y,scale,scale);

		context.fillStyle = color;
		context.fillRect(x+scale/8,y+scale/8,scale/8*6,scale/8*6);

		context.beginPath();
		
		context.fillStyle = "#1e1e36";
		if(shape == "circle"){
			context.arc(x+scale/2,y+scale/2,scale/5,0,2*Math.PI);
			context.fill();
		}else if (shape =="square"){
			context.fillRect(x+scale/10*3,y+scale/10*3,scale/5*2,scale/5*2);
		}
	}

	function drawFood(x,y,color,shape){
		context.beginPath();
		if(shape == "circle"){
			var radius = scale/4;
			context.arc(x+scale/2, y+scale/2, radius, 0, 2 * Math.PI, false);
			context.fillStyle = color;
			context.fill();
		}else if(shape == "square"){
			context.fillStyle = color;
			context.fillRect(x+scale/4,y+scale/4,scale/2,scale/2);
		}
	}

	function dot(a,b,i){
		var x = margins['left'] + scale*a;
		var y = margins['top'] + scale*b;
		drawFood(x,y,shapes[i].color,shapes[i].shape);
	}

	return {
		draw: function(global_frame){
			
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.beginPath();

			//create a border
			
			context.fillStyle = "#615756";
			// context.fillStyle = "#50c8ff";
			 
			context.fillRect(margins['left'], margins['top'], scale*col, scale*row);

			context.fillStyle = "#22243d";
			// context.fillStyle = "#051d25";
			context.fillRect(margins['left']+border_thickness, margins['top']+border_thickness, scale*col-border_thickness*2, scale*row-border_thickness*2);

			if(env.getClickSomeWhereTextShow()){
				drawClickSomeWhereText();
			}
			
			drawInstructions(global_frame);
			
			drawChallengesCompleted();
			// draw leaderbroad button
			drawThankYou();
			// draw free play button

			
			if(env.getNotificationClock()>0){
				drawNotification(env.getNotificationText());
				env.notificationClockCountDown();
			}

			//draw scores
			var title_font_size = scale/2;
			context.font = title_font_size+'px Actor';
			context.textBaseline="middle"; 

	


			drawScore(the_blue,0,"Gender Identity","gen_id",["Woman-ness","Man-ness"]);

			drawScore(the_yellow,1,"Gender Expression","gen_exp",["Feminine","Masculine"]);

			drawScore(the_purple,2,"Biological Sex","bio_sex",["Female-ness","Male-ness"]);

			drawScore(the_orange,3,"Sexually Attracted to","sex_attract",["Women/Females/Femininity","Men/Males/Masculinity"]);

			drawScore(the_white,4,"Romantically Attracted to","roman_attract",["Women/Females/Femininity","Men/Males/Masculinity"]);


			//draw long cat body components
			for(i=0;i<seq.length;i++){


				//draw body connections
				context.beginPath();
				if(i+1<seq.length){
					if(seq[i+1].x>seq[i].x){
						//right
						var x = margins['left'] + scale*seq[i].x+scale/2;
						var y = margins['top'] + scale*seq[i].y+scale/8*3;
						context.rect(x,y,scale,scale/4);
					}else if(seq[i+1].x<seq[i].x){
						var x = margins['left'] + scale*seq[i+1].x+scale/2;
						var y = margins['top'] + scale*seq[i+1].y+scale/8*3;
						//left
						context.rect(x,y,scale,scale/4);
					}else if(seq[i+1].y>seq[i].y){
						var x = margins['left'] + scale*seq[i].x+scale/8*3;
						var y = margins['top'] + scale*seq[i].y+scale/2;
						context.rect(x,y,scale/4,scale);
						//down
					}else if(seq[i+1].y<seq[i].y){
						var x = margins['left'] + scale*seq[i+1].x+scale/8*3;
						var y = margins['top'] + scale*seq[i+1].y+scale/2;
						//up
						context.rect(x,y,scale/4,scale);
					}
				}
				context.fillStyle = shapes[seq[i].shape].color;
				context.fill();

				//draw body nodes
				context.beginPath();
				if(i==0){
					var x = margins['left'] + scale*seq[i].x;
					var y = margins['top'] + scale*seq[i].y;
					drawCatHead(x,y);
				}else if(shapes[seq[i].shape].shape == "circle"){
					var radius = scale/4;
					var x = margins['left'] + scale*seq[i].x+scale/2;
					var y = margins['top'] + scale*seq[i].y+scale/2;
					context.arc(x, y, radius, 0, 2 * Math.PI, false);
					context.fillStyle = shapes[seq[i].shape].color;
					context.fill();
				}else if(shapes[seq[i].shape].shape == "square"){
					var x = margins['left'] + scale*seq[i].x+scale/4;
					var y = margins['top'] + scale*seq[i].y+scale/4;
					context.rect(x, y, scale/2, scale/2);
					context.fillStyle = shapes[seq[i].shape].color;
					context.fill();
				}


			}			

			//draw food
			for(i=0;i<food.length;i++){
				
				var x = margins['left'] + scale*food[i].x;
				var y = margins['top'] + scale*food[i].y;
				var shape = shapes[food[i].shape].shape;
				var color = shapes[food[i].shape].color;
				drawFood(x,y,color,shape);
			}

			// draw tunnels

			for(i=0;i<tunnels.length;i++){
				var x = margins['left'] + scale*tunnels[i].x;
				var y = margins['top'] + scale*tunnels[i].y;
				var color = shapes[tunnels[i].shape].color;
				var shape = shapes[tunnels[i].shape].shape;

				drawTunnel(x,y,color,shape);
			}




		},// draw
		drawSpark : function(spark_x, spark_y, shape_i, frame){

			var shape = shapes[shape_i].shape;
			context.fillStyle = shapes[shape_i].color;
			var shape_size = 4*frame;
			var alpha = 0.05;
			if(shape == "circle"){
				context.beginPath();
				context.arc(spark_x,spark_y,shape_size,0,2*Math.PI);
				context.globalAlpha = 0.2;
				context.fill();
				context.globalAlpha = 1;
			}else if(shape =="square"){
				context.beginPath();
				context.globalAlpha = 0.2;
				context.fillRect(spark_x-shape_size,spark_y-shape_size,shape_size*2,shape_size*2);
				context.globalAlpha = 1;
			}


		},//drawSpark
		drawThankYou:drawThankYou,
		drawNotification: drawNotification

	}//return
});