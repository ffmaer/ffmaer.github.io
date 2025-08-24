var express = require('express');
var app = express();
var http =require('http').Server(app);
var io = require('socket.io')(http);
var randomNormal = require('random-normal');
var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');

app.set('views','./views');
app.set('view engine','pug');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.use(stylus.middleware(
  {
  	src: __dirname + '/stylesheets',
   	dest: __dirname + '/public/css',
  	compile: compile
  }
));

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('index');
});

app.get('/resources', function(req, res){
  res.render('resources');
});

app.get('/syllabus', function(req, res){
  res.render('syllabus');
});

app.get(/hw\d+$/, function(req, res){

	let hwid = Number.parseInt(req.originalUrl.match(/\d+/)[0]);
	if(fs.existsSync(__dirname + `/views/hw${hwid}.pug`) && hwid<3){
		res.render(`hw${hwid}`,{hwid:hwid});	
	}else{
		res.send("hw not found");
	}
});

app.get('/words300', function(req, res){

	function newWord(){
		let average_len = 5.1;// average length of english words
		let len = Math.floor(randomNormal({mean:average_len}));
		if(len == 0){
			len = 1;
		}
		let word="";
		for(let i=0;i<len;i++){
			word += newLetter();
		}
		return word;
	}

	function newLetter(){
		// return String.fromCharCode(97+Math.floor(Math.random()*26));
		return "a";
	}
	
	let words="";
	for(let i=0;i<300;i++){
		words += (newWord() + " ");
	}

  res.render('words300',{words:words});
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log(`listening on *:${port}`);
});