
function ini_server()
{
    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    const url = require('url');
    const port = process.env.PORT || 8000;


    let data = JSON.parse(fs.readFileSync('data.json'));

    var server = http.createServer((req, res) => {
        let filePath = path.join(
            __dirname,
            "../public/html",
            req.url === "/" ? "index.html" : req.url
        );
        console.log(req.ip);
        let extName = path.extname(filePath);
        let contentType = 'text/html';

        switch (extName) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }

        console.log(`File path: ${filePath}`);
        console.log(`Content-Type: ${contentType}`)

        res.writeHead(200, {'Content-Type': contentType});
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    });

    server.listen(port, data["ipv4"])
    {
        console.log(`Opening your server at: ${data["ipv4"]}:${port}`);
    };
}

exports.ini_server = ini_server; //exports ini_server