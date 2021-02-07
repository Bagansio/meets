const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});
require('./modules/passport-setup');
require('./modules/db');
const app = express();

// settings
app.set('port',8000);
app.set('view engine','ejs');                   //we set ejs to 'compile' ours html
app.engine('html',require('ejs').renderFile);   //we 'compile' html files as ejs
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());

//this is for requests etc
app.use(
    cors({
         origin: ('http://'+process.env.domain+':3000'), // allow to server to accept request from different origin
         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
         credentials: true, // allow session cookie from browser to pass through
   })
);

//google-login
//                  Before global-deploy look this
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());

//middlewares


//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/user'));
app.use(require('./routes/api'));
// static files
app.use(express.static('public'));
//listening the server

app.listen(app.get('port'), '192.168.8.108' ,() =>
{
    console.log(`Server on http://${process.env.domain}:${app.get('port')}`);   
})