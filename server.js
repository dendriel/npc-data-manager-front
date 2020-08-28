'use strict';

const express = require('express');

// Constants
const host = '0.0.0.0';
const port = 9090;

const app = express();
app.use(express.static('app'));
app.get('/', function (req, res){
    res.redirect('/');
});

app.listen(port, host);
console.log(`App is running at ${host}:${port}`);
