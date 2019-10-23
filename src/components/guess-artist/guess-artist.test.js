import React from 'react';
import renderer from 'react-test-renderer';
import {GuessArtist} from "components/guess-artist/guess-artist";
import {questions} from "../../mocks/questions";

const question = questions[0];

it(`render correctly guess artist component`, () => {
  const guessArtistComponent = renderer.create(<GuessArtist
    onAnswer = {() => {}}
    question = {question}
    screenIndex = {0}
  />).toJSON();

  expect(guessArtistComponent).toMatchSnapshot();
});
