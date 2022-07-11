# React CheatSheet

- [React CheatSheet](#react-cheatsheet)
  - [create-react-app with typescript support](#create-react-app-with-typescript-support)
  - [Typescript - adding aliases to project](#typescript---adding-aliases-to-project)

## create-react-app with typescript support  

```shell
npx create-react-app my-app --template typescript
```

## Typescript - adding aliases to project

It is very important to have consistent import statements in your react projects, and to preserve relative paths hell, ex. `../../../utils/smth.ts` looks much more ugly than `~/utils/smth.ts`.

Unfortunately, latest versions of typescript support this trick worse and worse (I don't know why, in fact).

One of ways of usage - with `@craco` package.

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
