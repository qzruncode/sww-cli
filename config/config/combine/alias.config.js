const Helper = require('./helper');

module.exports = {
  $enhance: Helper.resolveApp('./src/enhance/'),
  $components: Helper.resolveApp('./src/components/'),
  $containers: Helper.resolveApp('./src/containers/'),
  $constants: Helper.resolveApp('./src/constants/'),
  $services: Helper.resolveApp('./src/service/'),
  $styles: Helper.resolveApp('./src/styles'),
  $models: Helper.resolveApp('./src/models'),
  $utils: Helper.resolveApp('./src/utils'),
  $store: Helper.resolveApp('./src/store'),
  $hooks: Helper.resolveApp('./src/hooks'),
  $asset: Helper.resolveApp('./src/asset'),
};
