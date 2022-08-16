import React from 'react'
import { configure, addDecorator } from "@storybook/react";


function loadStories() {
    const req = require.context("../src", true, /\.stories\.tsx$/);
    req.keys().forEach(req);
}

addDecorator(S =>
    <TestProvider store={store}><S /></TestProvider>
);

configure(loadStories, module);
