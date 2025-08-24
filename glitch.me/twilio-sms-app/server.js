var express = require("express");
var Sequelize = require("sequelize");
var app = express();
var path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("public"));

const accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const twilio = require("twilio");
const MessagingResponse = twilio.twiml.MessagingResponse;

const client = new twilio(accountSid, authToken);

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

var Message;
// setup a new database
// using database credentials set in .env
var sequelize = new Sequelize(
  "database",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
    storage: ".data/database.sqlite"
  }
);

// authenticate with the database
sequelize
  .authenticate()
  .then(function(err) {
    console.log("Connection has been established successfully.");
    // define a new table 'messages'
    Message = sequelize.define("messages", {
      sid: {
        type: Sequelize.STRING
      },
      dateSent: {
        type: Sequelize.DATE
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      }
    });
  })
  .catch(function(err) {
    console.log("Unable to connect to the database: ", err);
  });

app.get("/sync-all-sms", function(req, res) {
  // Message.sync({force: true})
  // .then(function(){
  //   client.messages.each(function(message){
  //     Message.create({  sid: message.sid,
  //                       dateSent: message.dateSent,
  //                       from: message.from,
  //                       to: message.to,
  //                       body: message.body});
  //   });
  // });
  res.sendStatus(200);
});

app.get("/", function(req, res) {
  res.render("sms");
});

app.post("/get-sms", function(req, res) {
  if (req.body.ssss == process.env.SSSS) {
    var messagesReceived = [];
    Message.findAll({ limit: 1000, order: [["dateSent", "DESC"]] }).then(
      function(messages) {
        messages.forEach(function(message) {
          messagesReceived.push({
            sid: message.sid,
            dateSent: message.dateSent.toString(),
            from: message.from,
            to: message.to,
            body: message.body
          });
        });
        res.send({ messagesReceived: messagesReceived });
      }
    );
  } else {
    res.send({});
  }
});

// https://demo.twilio.com/welcome/sms/reply/

app.post("/receive-sms", function(req, res) {
  // forward to my ATT phone number
  // client.messages.create({
  //     body: req.body.From+": "+req.body.Body,
  //     to: "+1",
  //     from: "+1"
  // }, function(err, sms) {
  //     process.stdout.write(sms.sid);
  // });

  var today = new Date();
  var message = {
    sid: req.body.SmsMessageSid,
    dateSent: today,
    from: req.body.From,
    to: req.body.To,
    body: req.body.Body
  };
  Message.create(message);

  const twiml = new MessagingResponse();
  twiml.message('Your message: '+req.body.Body);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  // res.end();
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
