'use strict';

const express = require('express');
const httpProxy = require('http-proxy');

// Constants
const host = '0.0.0.0';
const port =  parseInt(process.env.FRONTEND_PORT) || 9090;

const app = express();
app.use(express.static('app'));

const apiProxy = httpProxy.createProxyServer();

const backendUrl = process.env.BACKEND_URL || "http://localhost:8080/rest/";
app.use("/rest/", function(req, res) {
    console.log("Request for backend: " + req.url);
    apiProxy.web(req, res, { target: backendUrl, changeOrigin: true, autoRewrite: true });
});


app.use('/', function (req, res){
    console.log("Request for frontend: " + req.url);
    res.redirect('/');
});

app.listen(port, host);
console.log(`App is running at ${host}:${port}`);
