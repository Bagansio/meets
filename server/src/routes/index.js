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

//returns true if u are logged
//        false if not
function logged(req)
{
    if(req.user) return true;
    else return false;
}

router.get('/',(req,res) =>
{
    res.render('index.html',{logged: logged(req), user: req.user});
})

router.get('/schedule',isLoggedIn,(req,res) =>
{

    res.render('schedule.html', {logged: logged(req), user: req.user});
})

router.get('/user',isLoggedIn,(req,res) =>
{

    res.render('user.html', {logged: logged(req), user: req.user});
})

module.exports = router;