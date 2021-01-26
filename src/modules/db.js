const mysql = require("mysql");
const dotenv = require('dotenv');

//dotenv is for config no -> need json
dotenv.config({path: './.env'});

//MY DB 
const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_connection
});
//MY DB CONNECTION
db.connect( (error) => {
    if(error) {
        console.log(error)
    } else{
        console.log(`MYSQL Connected to ${process.env.db_connection}`)
    }
});