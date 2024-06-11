const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://task-0i8m.onrender.com',
      changeOrigin: true,
      headers: {
        "X-Forwarded-Host": "task-frontend-ahzg.onrender.com"
      }
    })
  );
};
