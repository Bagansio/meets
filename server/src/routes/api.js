const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
const db = require('../modules/db');
//dotenv is for config no -> need json
dotenv.config({path: './.env'});


//API ROUTES

logPetition = (type,namePetition, ip) => {
    console.log(type + " REQUEST OF " + namePetition + " FROM: " + ip + "\n");
}

const isLoggedIn = (req,res,next) => {
    if(req.user){
        next();
    } else{
        res.redirect('/');
    }
}



router.get('/api/test',(req,res,next) => 
{
    res.send("API is ok ^^");
})

router.post('/api/changeusername',(req,res,next) => 
{
    let newUsername = req.body.newUsername || '';
    let id = req.body.id || '';
    logPetition("POST","changeusername",req.ip);
    console.log("with id: " + id)
    if(newUsername != '' && id != '') 
    {
        let resp = db.change_username(req.body.id,req.body.newUsername);
        res.json({succes : resp});
    }
    else res.json({succes:false});
})

router.get('/api/login', (req,res,next) => 
{
    logPetition("GET","login",req.ip);
    if(req.user){
        res.redirect('http://' + process.env.domain + ':3000');
    }
    else{
        res.redirect('/google');
    }
})

router.get('/api/user',(req,res,next) => 
{
    logPetition("GET","user",req.ip);
    if(req.user){
        res.json(req.user);
    }
    
    else{
        res.json({logged: false})
    }
})

router.get('/api/logout',(req,res) => {
    req.session = null;
    req.logout();
    res.send({logged: false});
});




module.exports = router;
