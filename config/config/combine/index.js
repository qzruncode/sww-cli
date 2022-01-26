const Helper = require('./helper');
const aliasConfig = require('./alias.config');
const { plugins } = require('./plugins');
const loaders = require('./loaders');

const publicUrl = process.env.PUBLIC_URL;

exports.output = {
  path: Helper.resolveApp('build'),
  filename: 'js/[name].[contenthash].js',
  chunkFilename: 'js/[name].[contenthash].js',
  publicPath: publicUrl,
};

exports.resolve = {
  extensions: ['.ts', '.tsx', '.js'],
  modules: [
    // 设置解析模块时要查找的路径
    'node_modules',
    Helper.resolveApp('node_modules'),
    Helper.resolveApp('src'),
  ],
  alias: {
    '@': Helper.resolveApp('src'),
    ...aliasConfig,
  },
  // fallback: {
  //   buffer: require.resolve('buffer/'),
  //   path: require.resolve('path-browserify'),
  //   util: require.resolve('util/'),
  //   url: require.resolve("url/"),
  //   events: require.resolve("events/")
  // },
};

exports.optimization = {
  usedExports: true,
  sideEffects: true,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      bigSize: {
        enforceSizeThreshold: 10000,
        name(module, chunks, cacheGroupKey) {
          const moduleFileName = module
            .identifier()
            .split('/')
            .reduceRight((item) => item);
          const allChunksNames = chunks.map((item) => item.name).join('~');
          return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
        },
        reuseExistingChunk: true,
      },
    },
  },
};

exports.plugins = plugins;
exports.loaders = loaders;
exports.Helper = Helper;