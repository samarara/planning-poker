const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api/v1/*", {
      target: "http://localhost:8080",
      changeOrigin: true,
      secure: false,
      logLevel: "debug",
    })
  );
  app.use(
    "/socket.io/*",
    createProxyMiddleware(["!/sockjs-node"], {
      target: "http://localhost:8080",
      ws: true,
      secure: false,
      logLevel: "debug",
      changeOrigin: true,
    })
  );
};
