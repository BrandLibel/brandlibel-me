const IS_LOCAL = true;

const express = require('express');
const app = express();

const filePath = __dirname + '/../../dist';

app.use(express.static(filePath), function (req, res, next){
    next();
});

//
app.get("/moody", function (req, res){
    console.log("redirecting");
    res.redirect("/work");
});
//

app.listen(3000);

console.log("Hello World");