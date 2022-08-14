const RewireDefinePlugin = require('./RewireDefinePlugin');

module.exports = () => (config) => {
  config = RewireDefinePlugin(config, {
    BUILD_VERSION: JSON.stringify(require('../package.json').version)
  });

  // config.devtool = "hidden-source-map";
  config.output = {
    ...config.output,
    sourceMapFilename: 'sourcemaps/[file].map'
  };

  return config;
};
