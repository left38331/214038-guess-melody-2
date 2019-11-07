import React from 'react';
import renderer from 'react-test-renderer';
import {GuessGenre} from 'components/guess-genre/guess-genre';
import {questions} from '../../mocks/questions';

const question = questions[1];

it(`render correctly guess genre component`, () => {
  const props = {
    formSubmitHandler: () => {},
    getValueForAnswer: () => {},
    question
  };

  const guessGenreComponent = renderer.create(<GuessGenre {...props} />, {
    createNodeMock: (element) => {
      if (element.type === `audio`) {
        return {};
      }
      return null;
    }}).toJSON();

  expect(guessGenreComponent).toMatchSnapshot();
});
