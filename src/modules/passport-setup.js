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
    /*
    User.findById(id,function(err,user)
    {
        done(err,user);
    });
    */
   done(/*err*/null,user);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.Google_clientID,
    clientSecret: process.env.Google_clientSecret, 
    callbackURL: "http://localhost:8000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      // use the profile info(mainly profile id) to check if the user is registered in our db


      //this is for use more easy and shorter info about use 
      //it should be correct in a future, now i'm exhaust with that :(
      const user = {
        id: profile.id,
        username: profile.displayName,
        role: 'user',
        pictureUrl : profile.photos[0].value,
        email : profile.emails[0].value
      }
      //this function if exists the user doesn't add in the db and add in the db if not
      db.findOrCreate(profile);
       return done(null,user);
      //console.log(accessToken);
     // console.log(refreshToken);
      //console.log(profile);
      //console.log(Date());
       //return done(null,profile);
  }
));