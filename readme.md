# React CheatSheet

- [React CheatSheet](#react-cheatsheet)
  - [create-react-app with typescript support](#create-react-app-with-typescript-support)
  - [Typescript - adding aliases to project](#typescript---adding-aliases-to-project)
    - [Using `@craco/craco` package](#using-cracocraco-package)
    - [Using `react-app-rewired` and `customize-cra`](#using-react-app-rewired-and-customize-cra)
  - [React-app-rewired CheatSheet](#react-app-rewired-cheatsheet)
  - [Configuring storybook](#configuring-storybook)

## create-react-app with typescript support  

```shell
npx create-react-app my-app --template typescript
```

## Typescript - adding aliases to project

It is very important to have consistent import statements in your react projects, and to preserve relative paths hell, ex. `../../../utils/smth.ts` looks much more ugly than `~/utils/smth.ts`.

Unfortunately, latest versions of typescript support this trick worse and worse (I don't know why, in fact).

### Using `@craco/craco` package

Steps for installation:

1. `yarn add @craco/craco`
2. Make file `craco.config.js` in root of project
3. Put text below to `craco.config.js`:

   ```javascript
    const path = require('path');
    module.exports = {
    webpack: {
        alias: {
        '~': path.resolve(__dirname, 'src'),
        },
    },
    };
   ```

4. Change react scripts in `package.json` to:

   ```javascript
    "scripts": {
        "start": "craco start",
        "build": "craco build",
        "test": "craco test",
        "eject": "craco eject"
    }
   ```

5. Start project and check everything works: `yarn start`

### Using `react-app-rewired` and `customize-cra`

Steps for installation:

1. `yarn add react-app-rewired`
2. `yarn add  customize-cra`
3. In `config-overrides.js` add those lines:

   ```javascript
   const { addWebpackAlias } = require('customize-cra');
   const path = require('path');

   //... in module.export of configuration section:
   addWebpackAlias({
    '~': path.resolve(__dirname, './src'),
    // ...
   })
   ```

4. And font forget to add similar aliases to `tsconfig.json`:

   ```javascript
    "paths": {
      "~/*": [
        "./src/*"
      ],
    },
   ```

## React-app-rewired CheatSheet

Available here in separate document - [link](./config/react-app-rewired/readme.md)

## Configuring storybook

- Install dependencies

```js
yarn install @storybook/react @types/storybook__react @storybook/preset-create-react-app @storybook/builder-webpack5 @storybook/manager-webpack5
```

- Add command to `package.json`

```js
"storybook": "NODE_OPTIONS='--openssl-legacy-provider' start-storybook -p 9009 -s public" 
```

- Create folder `.storybook` in root of your project
- Create file `.storybook/preview.tsx` with content:

```js
import React from 'react'
import { configure, addDecorator } from "@storybook/react";
import { TestProvider } from '../src/utils/tests';
import { store } from '../src/redux/store';

const req = require.context("../src", true, /\.stories\.tsx$/);

function loadStories() {
    req.keys().forEach(req);
}

// Test provider contains all necessary react contexts for proper application work, such as redux context, @mui/theme provider, and so on
addDecorator(S =>
     <TestProvider store={store}><S /></TestProvider>
 );

configure(loadStories, module);

```

- Create file `.storybook/main.js` with content:

```js
const path = require('path');

module.exports = {
  addons: [
    '@storybook/preset-create-react-app'
  ],
  core: {
    builder: 'webpack5',
  },
  // feel free to modify webpack config here as well
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // my custom alias for pretty-path module resolution. ~ sign points to root of src folder
    config.resolve.alias['~'] = path.resolve(__dirname, '../src');

    return config;
  }
}

```