// const RewireDefinePlugin = require('./RewireDefinePlugin');
const { addWebpackAlias } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = () => (config) => {

  addWebpackAlias({
    '~': path.resolve(__dirname, '../src'),
  })(config);

  // const loaders = config.resolve;

  // config.plugins.push(
  //   new webpack.ProvidePlugin({
  //     Buffer: ["buffer", "Buffer"],
  //     process: "process/browser",
  //   }),
  // );

  // loaders.fallback = {
  //   http: require.resolve("stream-http"),
  //   https: require.resolve("https-browserify"),
  //   crypto: require.resolve("crypto-browserify"),
  //   path: require.resolve('path-browserify'),
  //   scrypt: require.resolve("scrypt-js"),
  //   buffer: require.resolve("buffer"),
  //   stream: require.resolve("stream-browserify"),
  //   os: require.resolve("os-browserify/browser"),
  //   url: require.resolve("url"),
  //   assert: require.resolve("assert"),
  // }

  return config;
};
