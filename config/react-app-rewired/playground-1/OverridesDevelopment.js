const RewireDefinePlugin = require('./RewireDefinePlugin');

// console.log(util.inspect(config, { showHidden: false, depth: null }));

// config.resolve.modules = [path.join(__dirname, 'src')].concat(
//   config.resolve.modules
// );

// return config;

module.exports = () => (config) => {
  config = RewireDefinePlugin(config, {
    BUILD_VERSION: JSON.stringify(require('../package.json').version)
  });

  return config;
};
