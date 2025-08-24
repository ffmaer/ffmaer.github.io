let express = require("express");
let router = express.Router();
let sqlite3 = require("sqlite3").verbose();
let config = require("./config")
let db = new sqlite3.Database(config.db_path);

router.get("/", function (req, res, next) {
  db.all("SELECT * FROM tags", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return
    }
    res.json(rows)
  });
});

module.exports = router;
