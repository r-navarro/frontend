const configModule = require('./config') 

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('', createProxyMiddleware({ target: configModule.URL, changeOrigin: true }));
app.listen(4000);