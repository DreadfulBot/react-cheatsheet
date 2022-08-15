import React from 'react'
import { configure, addDecorator } from "@storybook/react";

const req = require.context("../src", true, /\.stories\.tsx$/);

function loadStories() {
    req.keys().forEach(req);
}

addDecorator(S =>
    // <TestProvider store={store}><S /></TestProvider>
);

configure(loadStories, module);
