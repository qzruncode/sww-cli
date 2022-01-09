const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const { Helper } = require('./combine');
const buildConfig = require('./config');
const proxy = require('./proxy');

const config = buildConfig();
const compiler = webpack(config);

const isHTTPS = process.env.HTTPS === 'true' ? true : false;
const publicUrl = process.env.PUBLIC_URL;

const configServer = PORT => {
  const options = {
    quiet: true,
    clientLogLevel: 'warn',
    https: isHTTPS,
    progress: true,
    writeToDisk: false,
    compress: true,
    open: true,
    hot: true,
    host: process.env.HOST,
    allowedHosts: [process.env.HOST],
    contentBase: Helper.resolveApp('static'), // 服务静态文件
    contentBasePublicPath: publicUrl, // 静态服务前缀
    publicPath: publicUrl,
    historyApiFallback: {
      disableDotRule: true,
      index: publicUrl,
    },
    proxy,
  };
  webpackDevServer.addDevServerEntrypoints(config, options);
  const server = new webpackDevServer(compiler, options);
  server.listen(PORT, function () {
    console.log(`project listening on port ${PORT}!\n`);
  });
};

Helper.checkPortIsValid(configServer);