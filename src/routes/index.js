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
    if(req.user)
    {
        res.render('index.html',{logged: true});
    }
    else res.render('index.html', {logged: false});
})

router.get('/schedule',isLoggedIn,(req,res) =>
{

    res.render('schedule.html', {title: req.user.username});
})

module.exports = router;