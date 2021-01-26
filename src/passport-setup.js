const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');

let data = JSON.parse(fs.readFileSync('data.json'));


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
    clientID: data["google-login"]["clientID"],
    clientSecret: data["google-login"]["clientSecret"],
    callbackURL: "http://localhost:8000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      // use the profile info(mainly profile id) to check if the user is registered in our db
      /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
       needed but right now i have not a db
       */
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
       return done(null,profile);
  }
));