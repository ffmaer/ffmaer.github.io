module.exports = {
    db_path: process.env.NODE_ENV==="development"? "./data/database.db" : "./.data/database4.db" 
};
