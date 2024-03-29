import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {GuessArtist} from 'components/guess-artist/guess-artist';
import {questions} from '../../mocks/questions';

const question = questions[0];

it(`render correctly guess artist component`, () => {
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
    mistakes: 0,
    renderPlayer: () => {},
    time: 300
  };

  const guessArtistComponent = renderer.create(<Provider store={store}>
    <GuessArtist {...props} />
  </Provider>, {
    createNodeMock: (element) => {
      if (element.type === `audio`) {
        return {};
      }
      return null;
    }}).toJSON();

  expect(guessArtistComponent).toMatchSnapshot();
});
