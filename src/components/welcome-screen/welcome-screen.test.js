import React from 'react';
import renderer from 'react-test-renderer';
import {WelcomeScreen} from 'components/welcome-screen/welcome-screen';

it(`render correctly welcome-screen component`, () => {
  const welcomeScreenComponent = renderer.create(<WelcomeScreen
    time = {0}
    errorCount = {0}
  />).toJSON();

  expect(welcomeScreenComponent).toMatchSnapshot();
});
