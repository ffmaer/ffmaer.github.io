const util = require('util')
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
app.set('view engine', 'pug')
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use('/images', express.static('images'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render('index');
});

app.get("/join-game/:room_id", function(req, res){
  var room_id = req.params["room_id"];
  if(room_id){
    res.render('aframe');
  }else{
    res.send({error:"The room id is missing."});
  }
});


// Simple in-memory store for now


const amount = 50;

function distance(){
  return Math.sin(Math.random()*Math.PI)*40-20;
}
function y_distance(){
  return Math.sin(Math.random()*Math.PI)*20;
}

var rooms = {};

function newRoom(room_id){
  rooms[room_id]={
    gold_index: Math.floor(Math.random()*amount),
    boxes: {},
    amount: amount,
    clients: {}
  };
  newBoxes(rooms[room_id].boxes);
  return room_id;
}

function newBoxes(boxes){
  for(var i=0;i<amount;i++){
    boxes[i]={
      x: distance(),
      y: y_distance(),
      z: distance(),
      scale: Math.random()+1,
      is_clicked: 0
    }
  }
}

var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {};

io.on('connection', function(socket){
  console.log(socket.id+' connected');
  
  socket.on('get-data', function(data){
    if(data.room_id){
      if(data.room_id in rooms){
        console.log(socket.id + "walked into room_id:"+data.room_id);
      }else{
        newRoom(data.room_id);
        console.log("room_id:" + data.room_id + " is created.");
      }
    }else{
      io.to(socket.id).emit('error',{message:"The room id is missing."});
    }
    
    rooms[data.room_id].clients[socket.id] = 1;
    clients[socket.id] =  data.room_id;
        
    io.to(socket.id).emit('data-ready',{boxes:rooms[data.room_id].boxes, amount: rooms[data.room_id].amount, gold_index:rooms[data.room_id].gold_index});    
  });

  socket.on('click', function(data){
    rooms[data.room_id]["boxes"][data.box_index].is_clicked = 1;
    for(var client in rooms[data.room_id].clients){
      io.to(client).emit('click', {box_index:data.box_index});    
    }
  });
  socket.on('restart', function(data){
    newBoxes(rooms[data.room_id].boxes);
    for(var client in rooms[data.room_id].clients){
      io.to(client).emit('restart');
    }
  });
  
  socket.on('disconnect', function(){
    console.log(socket.id+' disconnected');
    var room_id = clients[socket.id];
    console.log(socket.id + " left room "+ room_id);
    if(rooms[room_id]) delete rooms[room_id].clients[socket.id];
    delete clients[socket.id];
  });
});


http.listen(process.env.PORT, function(){
  console.log('listening on *:'+process.env.PORT);
});