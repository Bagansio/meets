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
    return false;
}

router.get('/',(req,res) =>
{
    res.render('index.html',{logged: logged(req)});
})

router.get('/schedule',isLoggedIn,(req,res) =>
{

    res.render('schedule.html', {user: req.user , logged: logged(req)});
})

module.exports = router;