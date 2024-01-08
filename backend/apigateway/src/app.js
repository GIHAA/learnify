const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const services = [
  { path: '/auth-service', target: 'http://localhost:3001' },
  { path: '/product-service', target: 'http://localhost:3002' },
];

services.forEach(({ path, target }) => {
  app.use(
    path,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: { [`^${path}`]: '' },
    })
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});
