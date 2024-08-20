const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cve.projectdiscovery.io',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove /api from the request path
      },
    })
  );
};