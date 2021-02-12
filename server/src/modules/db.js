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



//SUBJECTSINFO DB


//SUBJECTS DB


    //CRUD

    //CREATE - INSERT
    //  returns the subject if it creates 
    //          a object where is false and a string with the error if not
function create_subject(userId,subjectName)
{
    let sql = `INSERT INTO subjects VALUES (null,'${userId}','${subjectName}')`;
    let error = true;
    db.query(sql,function(err,result){
        
        if (err) error = {error: err}
        
    });
    return error;
}


    //SELECT
function select_subject(userId,subjectName)
{
    let sql = `SELECT * FROM subjects s WHERE s.userId = '${userId}' and s.name = '${subjectName}'`;
    db.query(sql,function(err,result){
        let error = {error: err}
        if (err) return  error;
        return result;
    });
}

function select_subjectById(userId)
{
    let sql = `SELECT * FROM subjects s WHERE s.userId = '${userId}'`;
    db.query(sql,function(err,result){
        let error = {error: err}
        if (err) return  error;
        return result;
    });
}

    //DELETE

        //by user id
function delete_subjectsByUserId(userId){
    let sql = `DELETE FROM subjects WHERE userId = '${userId}'`;
    db.query(sql,function(err,result){
        let error = {error: err}
        if (err) return  error;
        return result.affectedRows;
    });
}
        //by subject name
function delete_subjectsByName(subjectName){
    let sql = `DELETE FROM subjects WHERE name = '${subjectName}'`;
    db.query(sql,function(err,result){
        let error = {error: err}
        if (err) return  error;
        return result.affectedRows;
    });
}



    //UPDATE




//USER DB
function let_user(result)
{
    let user = {
        id: result.id,
        username: result.DisplayName,
        role: 'user',
        pictureUrl : result.PictureUrl,
        email : result.Email
    }
    return user;
}

function change_username(id,newUsername)
{
    let sql=`UPDATE users SET DisplayName = '${newUsername}' WHERE id = '${id}'`;
    db.query(sql,function(err,result){
        let error = {error: err}
        if (err) throw err;
        
    })
    return true;
}

exports.change_username = change_username;

function create_user(id,username,role, pictureUrl, email)
{
    let user = {
        id: id,
        username: username,
        role: role,
        pictureUrl : pictureUrl,
        email : email
    }
    return user;
}


//if exists the user doesn't add in the db and add in the db if not
function findOrCreateUser(user,done){
    
    db.query(`SELECT * FROM users u WHERE ${user.id} = u.id`,function(err,result)
    {
        
        if (err) throw err;
        else if(result.length == 0) //no exists
        {
            let sql = `INSERT INTO users VALUES (${user.id},'${user.displayName}','user','${user.photos[0].value}','${user.emails[0].value}')`;
            db.query(sql,function(err,result)
            {
                if(err) throw err;
                console.log("ADDED THIS USER")
                let usr = create_user(user.id,user.displayName,'user',user.photos[0].value,user.emails[0].value);
                console.log(usr);
                done(null,usr);
            });
        }
        else 
        {
            let usr = let_user(result[0]);
            done(null,usr);
        }
    });
}

exports.findOrCreateUser = findOrCreateUser;