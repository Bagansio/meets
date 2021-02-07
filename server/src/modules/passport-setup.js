const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv');
const db = require('./db');
//dotenv is for config no -> need json
dotenv.config({path: './.env'});

passport.serializeUser(function(user,done)
{
    done(null,user/*.id*/);
});

passport.deserializeUser(function(user/*id*/,done)
{
   done(/*err*/null,user);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.Google_clientID,
    clientSecret: process.env.Google_clientSecret, 
    callbackURL: ('http://' +process.env.domain +':8000/google/callback')
  },
  function(accessToken, refreshToken, profile, done) {
      // use the profile info(mainly profile id) to check if the user is registered in our db

      //this function if exists the user doesn't add in the db and add in the db if not
      let user = db.findOrCreateUser(profile,done);
  }
));