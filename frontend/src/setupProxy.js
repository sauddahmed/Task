const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://task-0i8m.onrender.com',
      changeOrigin: true,
      secure: false,
      headers: {
        "Host": "localhost:5000",
        "X-Forwarded-Host": "localhost:5000"
      },
    })
  );
};
