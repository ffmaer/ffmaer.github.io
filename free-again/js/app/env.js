define(["app/cookie"],function(cookie){
	//primitives that won't change
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	var scale = 30;
	var margins = {top:scale*2, left:scale, bottom:scale, right:scale*13};
	var col=20,row=20;
	var max_score = [11,11,11,11,11];
	var _border_thickness = scale/8;
	var texts = [
		{text:"Free Again: Sexuality Spectrum Snake >>",challenge_index:0},
		{text:"Level 1 of 5: \"How many roads must a man walk down before you call him a man?\" <<>>",challenge_index:0},
		{text:"The lyric is the first line of lyrics from Bob Dylan's famous song Blowin' In The Wind. <<>>",challenge_index:0},
		{text:"When a boy is born, usually his biological sex is determined for life. <<>>",challenge_index:0},
		{text:"However, being biologically male does not mean that he can claim to be a man without proof. <<>>",challenge_index:0},
		{text:"Man, as a title, needs to be earned and maintained. People are constantly judging. <<>>",challenge_index:0},
		{text:"Challenge 1: A manly man -->useArrows<<>>>",challenge_index:0},


		{text:"Level 2 of 5: Boyhood <<>>",challenge_index:1},
		{text:"Let me tell you a story of a cat. <<>>",challenge_index:1},
		{text:"When the cat was a boy, though he did not regard himself as a man, he never thought of himself as a woman. <<>>",challenge_index:1},
		{text:"His mother emphasized his intellectual development rather than physical strength. He had limited opportunities to express and establish his masculinity. <<>>",challenge_index:1},
		{text:"And he was somewhat feminine - his voice was sharp. <<>>",challenge_index:1},
		{text:"He was friends with boys and girls, though he was not attracted to any of them romantically or sexually. <<>>",challenge_index:1},
		{text:"Challenge 2: The cat in boyhood --><<>>",challenge_index:1},


		{text:"Level 3 of 5: Teenage and Young Adult Years <<>>",challenge_index:2},
		{text:"The cat soon grew into a teenager. <<>>",challenge_index:2},
		{text:"He became self-conscious about his romantic and sexual attraction towards other males. <<>>",challenge_index:2},
		{text:"He also became self-conscious about his expression of femininity and a potential lack of masculinity. <<>>",challenge_index:2},
		{text:"After hiding for so many years, he told his best friend in college that he was attracted to males. <<>>",challenge_index:2},
		{text:"Challenge 3: The cat during the teenage and young adult years --><<>>",challenge_index:2},


		{text:"Level 4 of 5: Older Adult <<>>",challenge_index:3},
		{text:"In the next 3 years, he met many people. During his alone time, he pondered deeply about cat sexuality. <<>>",challenge_index:3},
		{text:"He read extensively. At the end of the journey, he became more assured about himself. <<>>",challenge_index:3},
		{text:"He became more accepting of the masculinity and femininity within himself. <<>>",challenge_index:3},
		{text:"Challenge 4: The cat as an older adult --><<>>",challenge_index:3},

		{text:"Level 5 of 5: The Future <<>>",challenge_index:4},
		{text:"The cat will continue to explore in the future. <<>>",challenge_index:4},
		{text:"He kept the idea of the cat sexuality spectrum in mind, <<>>",challenge_index:4},
		{text:"and he does not feel a need to trap himself with one label or another anymore. <<>>",challenge_index:4},
		{text:"Challenge 5: The liberated cat in the future --><<",challenge_index:4}
		
	];
	//primitives that will change
	var game_over = false;
	var direct = 68;
	var pause = true;
	var green_light = false;
	var _line = 0;
	var _challenge_index = 0;
	var win_sound_played = false;
	var _notification_clock = 0;
	var _notification_text = "";
	var _click_some_where_text_show = true;
	
	//cookie


	function writeToChallengesCookie(){
		cookie.setCookie("challenges_completed",challenges_completed.map(function(x){return (x?"1":"0");}).join(","),365*2);
	}


	//array or dict
	var challenges_completed = [false,false,false,false,false];
	var challenges_cookie=cookie.getCookie("challenges_completed");

	if(challenges_cookie.length>0){
		var challenges_cookie_array = challenges_cookie.split(",").map(function(val){return parseInt(val);});
		challenges_completed = challenges_cookie_array;
	}else{
		writeToChallengesCookie();
	}
	
	function isAllChallengesCompleted(){
		var completed_count = 0;
		for(var i=0;i<challenges_completed.length;i++){
			if(challenges_completed[i]) completed_count++;
		}
		return (completed_count==5);
	}
	// keep track of available space
	var available = [];
	function initAvailable(){
		available.length=0;
		// the sides are locked
		// can't regenerate food on locked places
		for(var i=0;i<col;i++){
			for(var j=0;j<row;j++){
				if(i==0 || j == 0 ||i==col-1 ||j==row-1){
					locked.push(comma(i,j));
				}else{
					available.push(comma(i,j));	
				}
				
			}
		}
	}

	function comma(x,y){
		return x+","+y;
	}
	function isNotLocked(x,y){
		return (locked.indexOf(comma(x,y))==-1);
	}
	function availableListRemove(x,y){
		if(available.length>0){
			var index = available.indexOf(comma(x,y));
			if(index > -1){
				available.splice(index,1);	
			}
		}else if(available.length == 0){
			game_over = true;
		}
	}
	function availableListAdd(x,y){
		if(isNotLocked(x,y)) available.push(comma(x,y));
	}
	function availableListPop(){
		if(available.length>0){
			var index = Math.floor(Math.random()*available.length);
			var xy = available[index].split(",");
			var x = xy[0];
			var y = xy[1];
			available.splice(index,1);
			return {x:x,y:y};
		}else if(available.length==0){
			game_over = true;
			return {x:0,y:0};
		}
	}

	//locked: don't make space occupied by tunnels or edge areas become available for food regeneration
	var locked = [];
	var tunnels = [];// store tunnels

	function addTunnel(x,y,shape){
		tunnels.push({x:x,y:y,shape:shape,switch:0});
		locked.push(comma(x,y));
		availableListRemove(x,y);
	}

	function initTunnels(){
		tunnels.length=0;//a way to empty the array
		if(_challenge_index==0){
			for(i=0;i<10;i++){
				var layer = Math.floor(i / 5);
				var x = (i % 5)*2+1;
				var y = 16+layer*2;
				addTunnel(x,y,i);
			}
		}else if(_challenge_index == 1){
			addTunnel(16,16,5);

			addTunnel(1,14,0);
			addTunnel(1,16,1);
			addTunnel(1,18,2);

			addTunnel(3,14,3);
			addTunnel(3,16,4);
			addTunnel(3,18,6);

			addTunnel(5,14,7);
			addTunnel(5,16,8);
			addTunnel(5,18,9);
		}else if(_challenge_index == 2){
			addTunnel(8,7,1);
			addTunnel(10,7,3);

			addTunnel(7,8,5);
			addTunnel(9,8,7);
			addTunnel(11,8,9);

			addTunnel(7,10,4);
			addTunnel(9,10,6);
			addTunnel(11,10,8);

			addTunnel(8,11,0);
			addTunnel(10,11,2);
		}else if(_challenge_index ==3){
			

			addTunnel(7,18, 0);
			addTunnel(5,18, 1);
			addTunnel(3,18, 2);
			addTunnel(1,18, 3);

			addTunnel(1,16, 4);
			addTunnel(1,14, 5);
			addTunnel(1,12, 6);
			addTunnel(1,10, 7);
			addTunnel(1,8, 8);
			addTunnel(1,6, 9);
		}else if(_challenge_index == 4){
			addTunnel(2,2+0, 0);
			addTunnel(2,2+1, 1);
			addTunnel(2,3+2, 2);
			addTunnel(2,3+3, 3);
			addTunnel(2,4+4, 4);
			addTunnel(2,4+5, 5);
			addTunnel(2,5+6, 6);
			addTunnel(2,5+7, 7);
			addTunnel(2,6+8, 8);
			addTunnel(2,6+9, 9);
		}else{

			for(i=0;i<10;i++){
				
				var x = Math.floor(Math.random()*(col-2))+1;
				var y = Math.floor(Math.random()*(row-2))+1;

				addTunnel(x,y,i);

				

			}
		}
	}
	

	// the sequences that will be used to describe the long cat's body
	var seq = [];
	function initSeq(){
		seq.length=0;
		seq.push({x:0,y:0,shape:10});//cat head
		availableListRemove(0,0);
	}

	function addFood(x,y,shape){
		food.push({x:x,y:y,shape:shape});
		availableListRemove(x,y);
	}

	// generate some random food data
	var food = [];
	function initFood(){
		food.length=0;
		if(_challenge_index == 0){
			for(i=1;i<11;i++){
				addFood(i,1,1);
				addFood(i,2,3);
				addFood(i,3,5);
				addFood(i,4,6);
				addFood(i,5,8);
			}
		}else if(_challenge_index == 1){
			for(var i=4;i<14;i++){
				food.push({x:i,y:i,shape:5});
				availableListRemove(i,i);
			}
			for(var i=0;i<10;i++){
				if(i!=5){
					var result =  availableListPop();
					food.push({x:result.x,y:result.y,shape:i});	
				}
			}
		}else if(_challenge_index == 2){
			for(var i=1;i<6;i++){
				var a = 2;
				var b = 3;
				if(i%2==0){
					a = 3;
					b = 2;
				}
				addFood(a,i,1);
				addFood(b,i,3);
			}

			for(var i=0;i<9;i++){
				var a = i % 3;
				var b = Math.floor(i/3);
				addFood(15+a,15+b,5);

			}
			for(var i=0;i<9;i++){
				var a = i % 3;
				var b = Math.floor(i/3);
				var shape = 7;
				if(i==4) shape = 9;
				addFood(2+a,14+b,shape);
			}
			for(var i=0;i<9;i++){
				var a = i % 3;
				var b = Math.floor(i/3);
				var shape = 9;
				if(i==4) shape = 7;
				addFood(14+a,2+b,shape);
			}

			var list = [0,2,4,6,8];
			list.forEach(function(shape){
				var result =  availableListPop();
				food.push({x:result.x,y:result.y,shape:shape});
			})
		}else if(_challenge_index == 3){
			for(var i=0;i<10;i++){
				addFood(4+i,1,1);
			}
			for(var i=0;i<10;i++){
				addFood(4+i,3,9);
			}
			for(var i=0;i<4;i++){
				addFood(14+i,1,3);
			}
			for(var i=0;i<6;i++){
				addFood(18,1+i,3);
			}
			for(var i=0;i<11;i++){
				addFood(18,7+i,5);
			}
			for(var i=0;i<10;i++){
				addFood(18-i,18,7);
			}
			// for(var i=0;i<7;i++){
			// 	addFood(17-i,17,7);
			// }
			
			var list = [0,2,4,6,8];
			list.forEach(function(shape){
				var result =  availableListPop();
				food.push({x:result.x,y:result.y,shape:shape});
			})
		}else if(_challenge_index == 4){
			var category_list = [
				{category:1,amount:10},
				{category:3,amount:10},
				{category:5,amount:10},
				{category:7,amount:10},
				{category:9,amount:10},

				{category:2,amount:6},
				{category:6,amount:2},
				{category:8,amount:2},
			];
			var shape_list = [];
			Object.keys(category_list).forEach(function(key){
				var category = category_list[key].category;
				var amount = category_list[key].amount;
				for(var i =0;i<amount;i++){
					shape_list.push(category);
				}
			});
			var layer_size = 1;
			var direction = 1;
			var current_size = 0;
			var x = 10;
			var y = 1;
			for(var i =0;i<shape_list.length;i++){
				var shape = shape_list[i];
				x=x+direction;	
				if(current_size == layer_size){
					y=y+1;
					current_size=0;
					direction=direction*(-1);
					layer_size++;
				}
				addFood(x,y,shape);
				current_size++;
			}
			var list = [0,4];
			list.forEach(function(shape){
				var result =  availableListPop();
				food.push({x:result.x,y:result.y,shape:shape});
			})
		}else{
			for(i=0;i<10;i++){
				var result =  availableListPop();
				food.push({x:result.x,y:result.y,shape:i});
			}
		}
	}


	
	var shapes = {0:{color:'#5aa6d7', shape:"circle", category:"gen_id", manwoman: "woman"},
								1:{color:'#5aa6d7', shape:"square", category:"gen_id", manwoman: "man"},
								2:{color:'#e1b923', shape:"circle", category:"gen_exp", manwoman: "woman"},
								3:{color:'#e1b923', shape:"square", category:"gen_exp", manwoman: "man"},
								4:{color:'#af59a2', shape:"circle", category:"bio_sex", manwoman: "woman"},
								5:{color:'#af59a2', shape:"square", category:"bio_sex", manwoman: "man"},
								6:{color:'#f15c22', shape:"circle", category:"sex_attract", manwoman: "woman"},
								7:{color:'#f15c22', shape:"square", category:"sex_attract", manwoman: "man"},
								8:{color:'#f7f5e6', shape:"circle", category:"roman_attract", manwoman: "woman"},
								9:{color:'#f7f5e6', shape:"square", category:"roman_attract", manwoman: "man"},
								10:{color:'#ba5e2f', shape:"cathead", category:"", manwoman: ""}};
	
	// will be used to keep track of scores					
	var scores = {	gen_id:{woman:0,man:0},
								gen_exp:{woman:0,man:0},
								bio_sex:{woman:0,man:0},
								sex_attract:{woman:0,man:0},
								roman_attract:{woman:0,man:0}}

	function initScores(){
		Object.keys(scores).forEach(function(key){
			scores[key].woman =0;
			scores[key].man =0;
		});
	}

	var scores_goals = [

		{
			gen_id:{woman:0,man:10},
			gen_exp:{woman:0,man:10},
			bio_sex:{woman:0,man:10},
			sex_attract:{woman:10,man:0},
			roman_attract:{woman:10,man:0}
		},//0

		{
			gen_id:{woman:0,man:4},
			gen_exp:{woman:2,man:4},
			bio_sex:{woman:0,man:10},
			sex_attract:{woman:0,man:0},
			roman_attract:{woman:0,man:0}
		},//1
		{
			gen_id:{woman:0,man:6},
			gen_exp:{woman:0,man:6},
			bio_sex:{woman:0,man:10},
			sex_attract:{woman:0,man:10},
			roman_attract:{woman:0,man:10}
		},//2
		{
			gen_id:{woman:0,man:8},
			gen_exp:{woman:4,man:8},
			bio_sex:{woman:0,man:10},
			sex_attract:{woman:0,man:8},
			roman_attract:{woman:0,man:8}
		},//3
		{
			gen_id:{woman:0,man:10},
			gen_exp:{woman:6,man:10},
			bio_sex:{woman:0,man:10},
			sex_attract:{woman:2,man:10},
			roman_attract:{woman:2,man:10}
		}//4



	];


	function start(){
		game_over=false;
		direct=68;
		win_sound_played = false;
		pause =true;
		locked.length=0;
		initAvailable();
		initTunnels();
		initSeq();
		initFood();
		
		initScores();
	}
	start();

	return {
		restart: function(){
			start();
		},
		getCanvas: function(){ return canvas; },
		getContext: function(){ return context; },
		getMargins: function(){ return margins; },
		getScale: function(){ return scale; },
		getCol: function(){ return col; },
		getRow: function(){ return row; },
		getShapes: function(){ return shapes; },
		getMaxScore: function(){ return max_score[_challenge_index]; },

		getDirect: function(){ return direct; },
		setDirect: function(code){direct = code;},
		getavailable: function(){ return available; },
		getTunnels:  function(){ return tunnels; },
		getSeq:  function(){ return seq; },
		getFood:  function(){ return food; },
		getScores: function(){ return scores; },
		getScoresGoals: function(){ return scores_goals; },
		isWon: function(){

			var won = true;
			Object.keys(scores).forEach(function(key){
				if(scores[key]["woman"] != scores_goals[_challenge_index][key]["woman"]) won = false;
				if(scores[key]["man"] != scores_goals[_challenge_index][key]["man"]) won = false;
			});
			if(won){
				challenges_completed[_challenge_index] = true;
				writeToChallengesCookie();
			}
			return won;
		},
		getGameOver: function(){ return game_over; },
		setGameOver: function(val){ game_over = val},
		availableListAdd: availableListAdd,
		availableListRemove: availableListRemove,
		availableListPop: availableListPop,
		getPause: function(){return pause;},
		setPause: function(val){pause=val;},
		getGreenLight: function(){return green_light;},
		setGreenLight: function(val){green_light=val;},
		getLine: function(){return _line;},
		setLine: function(val){
			if(val>-1 && val < texts.length){
				var old_line = _line;
				
				var new_line = val;

				var old_challenge_index = texts[old_line].challenge_index;
				var new_challenge_index = texts[new_line].challenge_index;

				if(old_challenge_index==new_challenge_index){
					_line = new_line;
				}else{
					//check if the new challenge is within a completed challenge
					// from stage 2 to 3, stage 2 needs to be completed
					// from stage 3 to 2, stage 2 needs to be completed 
					// from 0 to -1, invalid
					if(challenges_completed[new_challenge_index-1] || challenges_completed[new_challenge_index] ){
						_line = new_line;
						_challenge_index = new_challenge_index;
						start();
					}else{
						//notify that the challenge needs to be completed before progressing
						_notification_clock = 10;
						_notification_text = "Complete this challenge before moving forward!";
					}
				}
			}
		},
		
		getChallengeIndex: function(){return _challenge_index},
		getText: function(){return texts[_line].text},

		getChallengesCompleted: function(){return challenges_completed},
		getWinSoundPlayed: function(){return win_sound_played},
		setWinSoundPlayed: function(val){return win_sound_played = true},
		isAllChallengesCompleted: isAllChallengesCompleted,
		getNotificationClock: function(){return _notification_clock;},
		notificationClockCountDown: function(){
			if(_notification_clock>0){
				_notification_clock--;	
			}
		},
		getNotificationText: function(){return _notification_text},
		getClickSomeWhereTextShow: function(){return _click_some_where_text_show},
		setClickSomeWhereTextShow: function(val){return _click_some_where_text_show =val},
		getBorderThickness:function(){return _border_thickness}
	}

});