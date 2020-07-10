const IS_LOCAL = true;

const express = require('express');
const path = require('path');
const app = express();

// HTTP
let hyperTextProtocol;
var server;
if (IS_LOCAL){
    hyperTextProtocol = require('http');
    server = hyperTextProtocol.Server(app);
}
else {
    var fs = require('fs');
    var https = require('https');
    hyperTextProtocol = https;
    server = https.createServer({ 
        key: fs.readFileSync('/etc/letsencrypt/live/brandlibel.me/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/brandlibel.me/fullchain.pem') 
    }, app);
}

const filePath = path.join(__dirname, '/../../dist');

app.use(express.static(filePath), function (req, res, next){
    next();
});

app.get('/indefinite', function(req, res){
    res.sendFile(path.join(__dirname, '/../../dist/indefinite.html'));
});
app.get('/indefinite-love', function(req, res){
    res.sendFile(path.join(__dirname, '/../../dist/indefinite-love.html'));
});

app.get('/pathfinder', function (req, res){
    res.redirect('/work');
});

app.get('/moody', function (req, res){
    res.redirect('/work');
});

app.get('/level-editor', function (req, res){
    res.redirect('/work');
});

app.get('/journey', function (req, res){
    res.redirect('/work');
});

app.get('/legal/privacy', function (req, res){
    res.redirect('/privacy');
});

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, '/../../dist/index.html'))
});

server.listen(3000, () => {
    console.log('Hello there! Server listening on port 3000');
});