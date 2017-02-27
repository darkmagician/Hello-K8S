var express = require('express'),
    http = require('http'),
    os = require('os'),
    process = require('process');

var app = express();



app.get('/', function(req, res, next) {

    res.send('I am '+ os.hostname() + ' at '+process.hrtime());
  
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});