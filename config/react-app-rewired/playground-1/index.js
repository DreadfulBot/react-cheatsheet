const {
  useBabelRc,
  override,
  addWebpackPlugin,
} = require('customize-cra');

// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const developmentOverrides = require('./OverridesDevelopment');
const productionOverrides = require('./OverridesProduction');
const commonOverrides = require('./OverridesCommon');

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

if (process.env.NODE_ENV === 'production') {
  module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc(),

    addWebpackPlugin(new AntdDayjsWebpackPlugin()),

    addWebpackPlugin(
      new UglifyJsPlugin({
        sourceMap: true
      }),
    ),

    productionOverrides(),
    commonOverrides(),
  );
} else {
  module.exports = {
    webpack: override(
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useBabelRc(),

      // addWebpackPlugin(new BundleAnalyzerPlugin()),

      developmentOverrides(),
      commonOverrides(),
    ),
    jest: (config) => {
      config.transformIgnorePatterns = ['node_modules/?!( @iconify-icons)'];
      config.setupFiles = ['jest-canvas-mock'];
      return config;
    }
  };
}
