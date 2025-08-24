let express = require("express");
let router = express.Router();
let sqlite3 = require("sqlite3").verbose();
let config = require("./config")
let db = new sqlite3.Database(config.db_path);
const auth = require('./auth')

router.get("/", function (req, res, next) {
  db.all("SELECT * FROM people ORDER BY born_year", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return
    }
    res.json(rows)
  });
});

router.post("/add", function (req, res, next) {
  auth(req.body.username,req.body.token, (not_found)=>{
    if(not_found){
      return res.sendStatus(401)
    }else{
      db.run(`INSERT INTO people (born_year, name, tags) VALUES (?,?,?)`, [req.body.born_year,req.body.name,req.body.tags], function(err) {
        if (err) {
          res.status(400).json({"error":err.message});
          return
        }
        console.log('person inserted, lastID: '+this.lastID)
        res.status(200).json({"id":this.lastID})
      });
    }
  })
});

router.delete("/delete", function (req, res, next) {
  auth(req.body.username,req.body.token, (not_found)=>{
    if(not_found){
      return res.sendStatus(401)
    }else{
      db.run(`DELETE FROM people WHERE id = ?`, [req.body.id], function(err) {
        if (err) {
          res.status(400).json({"error":err.message});
          return
        }
        console.log('deletedID: '+req.body.id)
        res.sendStatus(200)
      });
    }
  })
});

module.exports = router;
