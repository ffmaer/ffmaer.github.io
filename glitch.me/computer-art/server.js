const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

var corsOptions = {
  origin: ['http://localhost:3001','http://192.168.56.1:3001','http://192.168.3.11:3001'],
  optionsSuccessStatus: 200
}
var cors = require('cors')
app.use(cors(corsOptions))

let path = require('path');
let cookieParser = require('cookie-parser');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

let people = require('./routes/people');
app.use('/people', people);
let tags = require('./routes/tags');
app.use('/tags', tags);
let users = require('./routes/users');
app.use('/users', users);
let suggestions = require('./routes/suggestions');
app.use('/suggestions', suggestions);


// error handler
app.use(function(err, req, res, next) {
  console.log(err)
});

app.listen(port, () => {
  console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`)
  console.log(`Computer Art app listening at http://localhost:${port}`)
})