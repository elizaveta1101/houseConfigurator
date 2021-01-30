const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      // target: 'http://127.0.0.1:5000',
      target: 'https://api.428155-ck47250.tmweb.ru/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    })
  )
}
