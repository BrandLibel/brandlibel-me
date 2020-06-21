const IS_LOCAL = true;

const express = require('express');
const path = require('path');
const app = express();

const filePath = path.join(__dirname, '/../../dist');

app.use(express.static(filePath), function (req, res, next){
    next();
});

app.get('*', function (req, res){
    res.sendFile(path.join(__dirname, '/../../dist/index.html'))
});

// redirect unused pages
app.get('/moody', function (req, res, next){
    console.log('redirecting');
    res.redirect('/work');
});

app.listen(3000);

console.log('Hello World');