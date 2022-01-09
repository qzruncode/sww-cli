const webpack = require('webpack');
const buildConfig = require('./config/config');

const config = () => {
  webpack(buildConfig(), (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }
  
    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(
      stats.toString({
        colors: true,
        env: true,
      })
    );
  });
};
module.exports = config;
