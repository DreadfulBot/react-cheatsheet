const path = require('path');

module.exports = {
  addons: [
    '@storybook/preset-create-react-app'
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    config.resolve.alias['~'] = path.resolve(__dirname, '../src');

    return config;
  }
}
