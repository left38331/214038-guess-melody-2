import React from 'react';
import {shallow} from 'enzyme';

import {GuessGenre} from 'components/guess-genre/guess-genre';
import {questions} from '../../mocks/questions';

const question = questions[1];

it(`Test click on of answer in guess genre component`, () => {
  const clickHandler = jest.fn();
  const props = {
    question,
    onUserAnswer: clickHandler,
    onTimeTick: () => {},
    mistakes: 0,
    time: 300,
  };
  const guessArtistComponent = shallow(<GuessGenre {...props}/>);
  const form = guessArtistComponent.find(`.game__tracks`);
  form.simulate(`submit`, {preventDefault: () => {}});

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenCalledWith(expect.any(Array));
});
