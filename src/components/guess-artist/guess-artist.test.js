import React from 'react';
import renderer from 'react-test-renderer';
import {GuessArtist} from 'components/guess-artist/guess-artist';
import {questions} from '../../mocks/questions';

const question = questions[0];

it(`render correctly guess artist component`, () => {
  const props = {
    question,
    onUserAnswer: () => {},
    onTimeTick: () => {},
    mistakes: 0,
    time: 300,
  };

  const guessArtistComponent = renderer.create(<GuessArtist {...props} />, {
    createNodeMock: (element) => {
      if (element.type === `audio`) {
        return {};
      }
      return null;
    }}).toJSON();

  expect(guessArtistComponent).toMatchSnapshot();
});
