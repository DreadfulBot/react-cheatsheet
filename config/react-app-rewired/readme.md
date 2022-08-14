# React-app-rewired CheatSheet

## How plugin works

`config-overrides.js` of `config-overrides/index.js` should return object `module.exports = {` with segment `webpack` (and others) modified for your needs.

For redefining `webpack` section function `override` is used and it works a little bit tricky, if you want to dive deep.

You should pass function it it, that will be called and object `config` will be passed inside of that function, where you will be able to make detailed modifications

Example of such hight-oriented function:

```js
module.exports = () => (config) => {
  config = RewireDefinePlugin(config, {
    BUILD_VERSION: JSON.stringify(require('../package.json').version)
  });

  return config;
};
```

## Adding webpack plugin

```js
addWebpackPlugin(new AntdDayjsWebpackPlugin());
```

## Adding plugin with options

```js
addWebpackPlugin(
    new UglifyJsPlugin({
    sourceMap: true
    }),
);
```

## Adding webpack alias

```js
  addWebpackAlias({
    '~': path.resolve(__dirname, '../src'),
  })(config);

  // or if function called through `override` you shouldn't pass config, use it so:
  
  addWebpackAlias({
    '~': path.resolve(__dirname, '../src'),
  });
```

## Defining new variables in process.env through `RewireDefinePlugin`

```js
config = RewireDefinePlugin(config, {
    BUILD_VERSION: JSON.stringify(require('../package.json').version)
});
```

### Defining config.resolve.fallbacks

```js
  const loaders = config.resolve;

  loaders.fallback = {
    http: require.resolve("stream-http"),
    //...
  }
```

### Debug logger utility

```js
const util = require('util');
console.log(util.inspect(newInstance, { showHidden: false, depth: null }));
```
