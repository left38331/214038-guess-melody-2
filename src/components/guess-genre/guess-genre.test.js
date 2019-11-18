import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {GuessGenre} from 'components/guess-genre/guess-genre';
import {questions} from '../../mocks/questions';

const question = questions[1];

it(`render correctly guess genre component`, () => {
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

  const props = {
    question,
    onUserAnswer: () => {},
    onTimeTick: () => {},
    mistakes: 0,
    renderPlayer: () => {},
    renderGameAnswer: () => {},
    stateUserAnswers: [false, false, false, false],
    setStateUserAnswer: () => {},
  };

  const guessGenreComponent = renderer.create(<Provider store={store}>
    <GuessGenre {...props} />
  </Provider>, {
    createNodeMock: (element) => {
      if (element.type === `audio`) {
        return {};
      }
      return null;
    }}).toJSON();

  expect(guessGenreComponent).toMatchSnapshot();
});
