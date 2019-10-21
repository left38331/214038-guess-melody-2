import React from 'react';
import renderer from 'react-test-renderer';
import {App} from "./app";

it(`render correctly main component`, () => {
  const mainComponent = renderer.create(<App
    gameTime = {0}
    errorCount = {0}
  />).toJSON();

  expect(mainComponent).toMatchSnapshot();
});
