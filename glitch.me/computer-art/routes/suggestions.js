let express = require("express");
let router = express.Router();
let sqlite3 = require("sqlite3").verbose();
let config = require("./config")
let db = new sqlite3.Database(config.db_path);
const auth = require('./auth')

router.get("/", function (req, res, next) {
  db.all("SELECT * FROM suggestions", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return
    }
    res.json(rows)
  });
});

router.post("/add", function (req, res, next) {
  console.log(req.body)
  db.run(`INSERT INTO suggestions (suggestion, name) VALUES (?,?)`, [req.body.suggestion,req.body.name], function(err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return
    }
    console.log('suggestion inserted, lastID: '+this.lastID)
    res.status(200).json({"id":this.lastID})
  });
});

module.exports = router;
