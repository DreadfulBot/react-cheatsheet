const webpack = require('webpack');
// const util = require('util');

function RewireDefinePlugin(config, definePluginOptions = {}) {
  config.plugins = config.plugins || [];

  const oldInstance = config.plugins.find(
    (x) => x instanceof webpack.DefinePlugin
  );

  // console.log(util.inspect(oldInstance, { showHidden: false, depth: null }));

  const formattedPluginOptions = definePluginOptions;

  const newInstance = new webpack.DefinePlugin(formattedPluginOptions);

  // console.log(util.inspect(newInstance, { showHidden: false, depth: null }));

  if (oldInstance) {
    const oldProcessEnv =
      oldInstance.definitions && oldInstance.definitions['process.env'];

    if (oldProcessEnv) {
      oldInstance.definitions['process.env'] = {
        ...oldProcessEnv,
        ...newInstance.definitions
      };
    } else {
      oldInstance.definitions['process.env'] = newInstance.definitions;
    }
  } else {
    config.plugins = config.plugins.concat([newInstance]);
  }

  return config;
}

module.exports = RewireDefinePlugin;
