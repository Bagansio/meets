const express = require('express');
const path = require('path');

const app = express();


// settings
app.set('port',8000);
app.set('view engine','ejs');                   //we set ejs to 'compile' ours html
app.engine('html',require('ejs').renderFile);   //we 'compile' html files as ejs
app.set('views',path.join(__dirname,'views'));
//middlewares


//routes
app.use(require('./routes/index'));

// static files


//listening the server

app.listen(app.get('port'), () =>
{
    console.log(`Server on http://localhost:${app.get('port')}`);   
})