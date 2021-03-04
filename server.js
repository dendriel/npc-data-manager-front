'use strict';

const url = require('url');
const express = require('express');
const httpProxy = require('http-proxy');

// Constants
const host = '0.0.0.0';
const port =  parseInt(process.env.FRONTEND_PORT) || 9090;
const useS3 = process.env.S3_ENABLED === "true";
const s3BucketName = process.env.S3_BUCKET_NAME;

const app = express();

const apiProxy = httpProxy.createProxyServer();

const backendUrl = process.env.BACKEND_URL || "http://localhost:8080/rest/";
app.use('/rest/', function(req, res) {
    console.log("Request for backend: " + req.url);
    apiProxy.web(req, res, { target: backendUrl, changeOrigin: true, autoRewrite: true });
});


// Images provisioning
let s3 = null;
if (useS3) {
    const {S3} = require('@aws-sdk/client-s3');
    s3 = new S3();
}

app.use('/images/', function (req, res){
    console.log("Request for image: " + req.url);

    const q = url.parse(req.url, true);
        const name = q.query["name"];
    if (name === undefined) {
        res.status(404);
        res.type('txt').send('Not found');
        return;
    }

    const target = 'images/' + name;
    if (!useS3 || !s3 || !s3BucketName) {
        // Retrieves locally.
        console.log(`Get ${target} locally.`);
        res.redirect('/' + target);
        return;
    }

    const s3Params = { Bucket: s3BucketName, Key: target };

    // s3.listObjects({ Bucket: s3BucketName, Prefix: "images" }, function(err, data) {
    //     if (err) {
    //         console.log("There was an error deleting your album: ", err.message);
    //     }
    //     var objects = data.Contents.map(function (object) {
    //         return {Key: object.Key};
    //     });
    //     console.log(objects);
    // });

    const fileNameParts = s3Params.Key.split('.');
    if (fileNameParts.length === 1) {
        res.status(400);
        res.type('txt').send(`Invalid key: ${s3Params.Key}`);
        return;
    }

    s3.getObject(s3Params, function(err, data) {
        if (err) {
            if (err.name === "NoSuchKey") {
                res.status(404);
                res.type('txt').send('Not found');
                console.log(`Key not found: ${s3Params.Key}`);
                return;
            }

            res.status(500);
            res.type('txt').send(`Could not retrieve key: ${s3Params.Key}`);
            console.log(err);
            return;
        }

        console.log(`Forwarding ${s3Params.Key} from storage.`);
        res.status(200);
        res.setHeader('Content-type', data.ContentType);
        res.setHeader('Content-Length', data.ContentLength);
        res.setHeader('Last-Modified', data.LastModified);
        data.Body.pipe(res)
    });
});

app.use(express.static('app'));

app.use('/', function (req, res){
    console.log("Request for frontend: " + req.url);
    res.redirect('/');
});

app.listen(port, host);
console.log(`App is running at ${host}:${port}`);
