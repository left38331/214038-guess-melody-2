import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app';
import {questions} from "../../mocks/questions";

it(`render correctly first screen`, () => {
  const props = {
    onTimeTick: () => {},
    mistakes: 0,
    maxMistakes: 3,
    time: 300,
    step: -1,
    onWelcomeScreenClick: () => {},
    onUserAnswer: () => {},
  };

  const mainComponent = renderer.create(<App {...props} />).toJSON();

  expect(mainComponent).toMatchSnapshot();
});

it(`render correctly second screen`, () => {
  const props = {
    onTimeTick: () => {},
    mistakes: 0,
    maxMistakes: 3,
    time: 300,
    step: 0,
    onWelcomeScreenClick: () => {},
    onUserAnswer: () => {},
    questions
  };
  const mainComponent = renderer.create(<App {...props} />).toJSON();

  expect(mainComponent).toMatchSnapshot();
});

it(`render correctly thrid screen`, () => {
  const props = {
    onTimeTick: () => {},
    mistakes: 0,
    maxMistakes: 3,
    time: 300,
    step: 1,
    onWelcomeScreenClick: () => {},
    onUserAnswer: () => {},
    questions
  };
  const mainComponent = renderer.create(<App {...props} />).toJSON();

  expect(mainComponent).toMatchSnapshot();
});
