const IS_LOCAL = true;

const express = require('express');
const path = require('path');
const app = express();

const filePath = path.join(__dirname, '/../../dist');

app.use(express.static(filePath), function (req, res, next){
    next();
});

app.get('/indefinite', function(req, res){
    res.sendFile(path.join(__dirname, '/../../dist/indefinite.html'));
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

app.listen(3000);

console.log('Hello World');