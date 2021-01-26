const express = require('express');
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

const app = express();


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
        console.log(`MYSQL Connected to ${data.db.connection}`)
    }
});

// settings
app.set('port',8000);
app.set('view engine','ejs');                   //we set ejs to 'compile' ours html
app.engine('html',require('ejs').renderFile);   //we 'compile' html files as ejs
app.set('views',path.join(__dirname,'views'));

//middlewares


//routes
app.use(require('./routes/index'));

// static files


//listening the server

app.listen(app.get('port'), () =>
{
    console.log(`Server on http://localhost:${app.get('port')}`);   
})