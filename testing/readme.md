# React testing lib manual

## How to passthrough material media-query components

Components such as `<Hidden mdDown />`, or media query styles made with `[theme.breakpoints.down('md)] can work not properly during testing

Steps to follow:

- `yarn install css-mediaquery`
- in separate test:

```js
import mediaQuery from 'css-mediaquery';

function createMatchMedia(width) {
return (query) => ({
    matches: mediaQuery.match(query, {
    width
    }),
    addListener: () => {},
    removeListener: () => {}
});
}


beforeAll(() => {
    (window as any).matchMedia = createMatchMedia(window.innerWidth);
});
```

## How to get element with query selector

```js
import { render } from '@testing-library/react';

const { container } = render(<Component />);

const interestingElement = container.querySelector('#element_id');
```