
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
app.listen(4000);