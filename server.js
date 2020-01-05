var express = require('express');
var app = express();

app.use(express.static('app'));
app.get('/', function (req, res, next){
    res.redirect('/');
});

app.listen(9090, 'localhost');
console.log("App is running at localhost:9090");
