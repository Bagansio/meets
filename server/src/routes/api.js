const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
//dotenv is for config no -> need json
dotenv.config({path: './.env'});


//API ROUTES

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



router.get('/api/login', (req,res,next) => 
{
    if(req.user){
        res.redirect('http://' + process.env.domain + ':3000');
    }
    else{
        res.redirect('/google');
    }
})

router.get('/api/user',(req,res,next) => 
{
    
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
