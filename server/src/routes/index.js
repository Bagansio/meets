const express = require('express');
const router = express.Router();
const passport = require('passport');

//NORMAL ROUTES

const isLoggedIn = (req,res,next) => {
    if(req.user){
        next();
    } else{
        res.redirect('/');
    }
}



router.get('/',(req,res) =>
{
    res.render('index.html',{user: req.user});
})

router.get('/schedule',isLoggedIn,(req,res) =>
{

    res.render('schedule.html', {user: req.user});
})

router.get('/user',isLoggedIn,(req,res) =>
{

    res.render('user.html', {user: req.user});
})


router.get('/api/test',(req,res,next) => 
{
    res.send("API is ok ^^");
})

module.exports = router;