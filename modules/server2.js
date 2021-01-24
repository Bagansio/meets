
function ini_server(ipv4)
{
    const fs = require('fs');
    var express = require('express');


    /*
        THIS FUNCTION SETS THE APP
        PRE: an app
        POST: sets the app
    */
    function app_sets(app)
    {
        console.log("HEEY");
        const port = process.env.PORT || 8000;
        const pug = require('pug');
        app.set('port',port);
        app.set('view engine','pug');
        return port;
    }
    
    
    /*
        this function add the get
        PRE: an app
        POST: add its gets
    */
    function app_gets(app)
    {
        var public = __dirname.slice(0,-8);
        public += "/public";
    
        app.use(express.static(public));

        app.get('/test',function(req,res)
        {
            res.sendFile(public + "/html/test.html")
        });

        app.get('/',(req,res)=>
        {
            res.sendFile(public + "/html/index.html")
        });

        app.get('/schedule',(req,res)=>
        {
            res.sendFile(public + "/html/schedule.html")
        });

        app.get()


    }
    

    
    var app = express();

    let port = app_sets(app);
    app_gets(app);
    

    app.listen(port, ipv4)
    {
        console.log(`Example app listening at http://${ipv4}:${port}`)   
    }
}

exports.ini_server = ini_server; //exports ini_server