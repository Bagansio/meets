const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser');
const fs = require('fs');


require('./modules/passport-setup');
require('./modules/db');
const app = express();

// settings
app.set('port',8000);
app.set('view engine','ejs');                   //we set ejs to 'compile' ours html
app.engine('html',require('ejs').renderFile);   //we 'compile' html files as ejs
app.set('views',path.join(__dirname,'views'));
    //parse application/json
app.use(bodyParser.json());

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
// static files
app.use(express.static('public'));
//listening the server

app.listen(app.get('port'), () =>
{
    console.log(`Server on http://localhost:${app.get('port')}`);   
})