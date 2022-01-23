const Helper = require('./combine/helper');
const { output, resolve, optimization, plugins, loaders } = require('./combine');

const buildConfig = (plugin = []) => {
  const isDev = process.env.mode === 'Dev' ? true : false;
  const commonConfig = {
    target: 'web',
    stats: 'errors-warnings',
    entry: Helper.resolveApp('./src/index.tsx'),
    output,
    resolve,
    optimization,
    plugins: plugins.concat(plugin),
    module: { rules: loaders },
  };
  const devConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
  };

  const proConfig = {
    mode: 'production',
    devtool: 'source-map',
  };

  commonConfig.optimization.chunkIds = isDev ? 'named' : 'deterministic';
  const config = Object.assign({}, commonConfig, isDev ? devConfig : proConfig);

  return config;
};

module.exports = buildConfig;
