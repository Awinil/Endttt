var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function (req, res) {
    var dirname = 'index.html';
    var parsedUrl = url.parse(req.url, false);
    if(parsedUrl.pathname.length>1) {dirname = "." + parsedUrl.pathname;}
    var contentType = 'text/html';
    var extension = path.extname(parsedUrl.pathname);
    if( extension.localeCompare('.css') == 0) {
        contentType = 'text/css';
    } else if(extension.localeCompare('.js') == 0){
        contentType = 'text/javascript';
    } else if(extension.localeCompare('.jpg') == 0){
        contentType = 'image/jpg';
    } else if(extension.localeCompare('.mp4') == 0){
        contentType = 'video/mp4';
    } else if(extension.localeCompare('.json') == 0){
        contentType = 'application/json';
    }

    if (fs.existsSync(dirname)) {
        fs.readFile(dirname, function (err,data) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
              return res.end("Response code 500");
            } 
            res.writeHead(200, {'Content-Type': contentType});   
            res.write(data);
            return res.end();
          });
    } else {
        fs.readFile('error.html', function (new_err,data) {
            res.writeHead(404, {'Content-Type': contentType});    
            res.write(data);
            return res.end();
          });
    }
}).listen(3000);
