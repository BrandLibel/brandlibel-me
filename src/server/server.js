const IS_PRODUCTION = process.env.IS_PRODUCTION;
const ADMIN_PASSWORD = process.env.BRANDLIBEL_PASS;

const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const db = require('./db');

// HTTP
let hyperTextProtocol;
var server;
if (IS_PRODUCTION) {
    var fs = require('fs');
    var https = require('https');
    hyperTextProtocol = https;
    server = https.createServer({
        key: fs.readFileSync('/etc/letsencrypt/live/brandlibel.me-0001/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/brandlibel.me-0001/fullchain.pem')
    }, app);
}
else {
    hyperTextProtocol = require('http');
    server = hyperTextProtocol.Server(app);
}

const filePath = path.join(__dirname, '/../../dist');

app.use(express.static(filePath), (req, res, next) => {
    next();
});

app.get('/indefinite', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../dist/indefinite.html'));
});
app.get('/indefinite-love', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../dist/indefinite-love.html'));
});

app.get('/pathfinder', (req, res) => {
    res.redirect('/work');
});

app.get('/moody', (req, res) => {
    res.redirect('/work');
});

app.get('/level-editor', (req, res) => {
    res.redirect('/work');
});

app.get('/journey', (req, res) => {
    res.redirect('/work');
});

app.get('/legal/privacy', (req, res) => {
    res.redirect('/privacy');
});

app.get('/api/blog/all', (req, res) => {
    db.getAllPosts(posts => {
        res.json(posts);
    });
});

app.get('/api/blog/:slug', (req, res) => {
    db.getPost(req.params.slug, (err, post) => {
        res.json(post);
    });
});

function isValidPass(pass) {
    return ADMIN_PASSWORD == undefined
        || ADMIN_PASSWORD == pass;
}

app.post('/api/newPost', jsonParser, (req, res) => {
    const jsonBody = req.body;

    if (!isValidPass(jsonBody.adminPassword)) {
        res.status(401).send();
        return;
    }

    db.makeNewPost(jsonBody, (err, result) => {
        if (err) console.log(err);
        res.status(200).send();
    })
});

app.post('/api/editPost', jsonParser, (req, res) => {
    const jsonBody = req.body;

    if (!isValidPass(jsonBody.adminPassword)) {
        res.status(401).send();
        return;
    }

    db.editPost(jsonBody, (err, result) => {
        if (err) console.log(err);
        res.status(200).send();
    })
});

app.delete('/api/deletePost', jsonParser, (req, res) => {
    const jsonBody = req.body;

    if (!isValidPass(jsonBody.adminPassword)) {
        res.status(401).send();
        return;
    }

    db.deletePost(jsonBody.slug, (err, result) => {
        if (err) console.log(err);
        res.status(200).send();
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'))
});

if (process.env.CI) {
    process.exit();
}

server.listen(3000, '::', () => {
    console.log('Hello there! Server listening on port 3000');
});