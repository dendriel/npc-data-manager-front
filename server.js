'use strict';

const express = require('express');
const httpProxy = require('http-proxy');

// Constants
const host = '0.0.0.0';
const port =  parseInt(process.env.FRONTEND_PORT) || 9090;

const app = express();

//**********************************
// Useful for local testing.

const apiProxy = httpProxy.createProxyServer();

const authUrl = process.env.AUTH_URL || "http://localhost:8080/";
app.use('/rest/authenticate', function(req, res) {
    req.url = "/authenticate";
    console.log("Request for authentication: " + req.url);
    apiProxy.web(req, res, { target: authUrl, changeOrigin: true, autoRewrite: true });
});

const restUrl = process.env.BACKEND_URL || "http://localhost:8081/rest/";
app.use('/rest/', function(req, res) {
    console.log("Request for backend: " + req.url);
    apiProxy.web(req, res, { target: restUrl, changeOrigin: true, autoRewrite: true });
});

//**********************************

apiProxy.on('error', function (err, req, res) {
    res.writeHead(503, {
        'Content-Type': 'text/plain'
    });

    res.end(`${err}`);
});

const storageUrl = process.env.STORAGE_URL;
app.use('/storage/', function (req, res) {
    console.log("Request for storage: " + req.url);

    if (storageUrl == null) {
        // To use this, setup a hard link to "images" directory containing testing images.
        res.redirect('/' + req.query.storageId);
        return;
    }

    apiProxy.web(req, res, { target: storageUrl, changeOrigin: true, autoRewrite: true });
});

app.use(express.static('app'));

app.use('/', function (req, res){
    console.log("Request for frontend: " + req.url);
    res.redirect('/');
});

app.listen(port, host);
console.log(`App is running at ${host}:${port}`);
