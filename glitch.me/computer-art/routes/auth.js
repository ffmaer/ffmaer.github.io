let config = require("./config")
let sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(config.db_path);

module.exports = function (username, token, callback){
    db.get("SELECT id FROM users WHERE username = ? AND token = ?;", [username, token], (err, row) => {
        if(err){
            console.log(err.message)
        }
        callback(row === undefined)
    })
}