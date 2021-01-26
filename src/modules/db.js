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


function findOrCreate (user){
    //console.log(user);
    
    db.query(`SELECT * FROM users u WHERE ${user.id} = u.AccountId`,function(err,result)
    {
        /*
        if(err) throw err;
        else if(!result.length) console.log("EMPTY");
        else console.log(result);
        */
        if (err) throw err;
        else if(result.length == 0) //no exists
        {
            let sql = `INSERT INTO users VALUES (${user.id},'${user.displayName}','user','${user.photos[0].value}','${user.emails[0].value}')`;
            db.query(sql,function(err,result)
            {
                if(err) throw err;
                return console.log("ADDED THIS USER")
            });
        }
        else return console.log("ALREADY EXISTS")
    })
}

exports.findOrCreate = findOrCreate;