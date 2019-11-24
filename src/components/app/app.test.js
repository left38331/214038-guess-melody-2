import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {App} from './app';
import {questions} from '../../mocks/questions';

it(`render correctly first screen`, () => {
  const props = {
    mistakes: 0,
    maxMistakes: 3,
    step: -1,
    onWelcomeScreenClick: () => {},
    onUserAnswer: () => {},
    isAuthorizationRequired: true,
    requireAuthorization: () => {},
    onSubmit: () => {},
  };

  const mainComponent = renderer.create(<App {...props} />).toJSON();

  expect(mainComponent).toMatchSnapshot();
});

const gameState = {
  step: -1,
  time: 300,
};

const userState = {
  mistakes: 0,
};

const store = createStore(() => ({
  stateUser: userState,
  stateGame: gameState
}));

it(`render correctly second screen`, () => {
  const props = {
    mistakes: 0,
    maxMistakes: 3,
    step: 0,
    onWelcomeScreenClick: () => {},
    onUserAnswer: () => {},
    questions,
    isAuthorizationRequired: true,
    requireAuthorization: () => {},
    onSubmit: () => {},
  };
  const mainComponent = renderer.create(<Provider store={store}>
    <App {...props} />
  </Provider>).toJSON();

  expect(mainComponent).toMatchSnapshot();
});

it(`render correctly third screen`, () => {
  const props = {
    mistakes: 0,
    maxMistakes: 3,
    step: 1,
    onWelcomeScreenClick: () => {},
    onUserAnswer: () => {},
    questions,
    isAuthorizationRequired: true,
    requireAuthorization: () => {},
    onSubmit: () => {},
  };
  const mainComponent = renderer.create(<Provider store={store}>
    <App {...props} />
  </Provider>).toJSON();

  expect(mainComponent).toMatchSnapshot();
});
