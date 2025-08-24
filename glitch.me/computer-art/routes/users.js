let express = require("express");
let router = express.Router();
let sqlite3 = require("sqlite3").verbose();
let config = require("./config")
let db = new sqlite3.Database(config.db_path);
const crypto = require('crypto');

router.post("/auth", function (req, res, next) {
    let password = crypto.pbkdf2Sync(req.body.password, 'salt', 100000, 64, 'sha512').toString('hex');
    db.get("SELECT username, token FROM users WHERE username = ? AND password = ?;", [req.body.username, password], (err, row) => {
    if (err) {
      console.log(err.message)
      res.status(400).json({"error":err.message});
      return
    }
    if(row === undefined){
      res.status(200).json({'not_found':true})
    }else{
      res.status(200).json(row)
    }
  });
});

module.exports = router;
