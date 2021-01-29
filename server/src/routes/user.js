const express = require('express');
const router = express.Router();
const passport = require('passport');

//GOOGLE AUTH -- USER AUTH ROUTES

const isLoggedIn = (req,res,next) => {
    if(req.user){
        next();
    } else{
        res.sendStatus(401);
    }
}

router.get('/failed',(req,res) =>
{
    res.send("YOU FAILED TO LOG IN");
})

router.get('/good',isLoggedIn,(req,res) =>
{
    res.send(`WELCOME MR ${req.user.username}!`); //user.emails[0].value}!`);
})


router.get('/logout',(req,res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});


// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/google',passport.authenticate('google', { scope: ['profile','email','https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), //if it fails it redirect to /failed
function(req, res) {
res.redirect('/');
});

module.exports = router;