import React from 'react';
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {GuessArtist} from 'components/guess-artist/guess-artist';
import {questions} from '../../mocks/questions';

const question = questions[0];

it(`render correctly guess artist component`, () => {
  const store = createStore(() => ({
    step: -1,
    mistakes: 0,
    time: 300
  }));

  const props = {
    question,
    onUserAnswer: () => {},
    mistakes: 0,
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
