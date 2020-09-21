const path = require('path');

module.exports = {
    devServer: {
        open: false,
        host: "localhost",
        port: 8080,
        https: false,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8089/api", //目标主机
                ws: true, //代理的WebSockets
                changeOrigin: true, //需要虚拟主机站点
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}