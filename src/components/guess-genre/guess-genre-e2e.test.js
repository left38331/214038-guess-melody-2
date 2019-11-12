import React from 'react';
import {shallow} from 'enzyme';

import {GuessGenre} from 'components/guess-genre/guess-genre';
import {questions} from '../../mocks/questions';

const question = questions[1];
describe(`Testing Guess-genre component`, () => {
  const clickHandler = jest.fn();
  const renderPlayer = jest.fn();
  const props = {
    question,
    onUserAnswer: clickHandler,
    onTimeTick: () => {},
    mistakes: 0,
    time: 300,
    renderPlayer,
    renderGameAnswer: () => {},
    stateUserAnswers: [false, false, false, false],
    setStateUserAnswer: () => {},
  };
  const guessGenreComponent = shallow(<GuessGenre {...props}/>);

  it(`Test click on of answer in guess genre component`, () => {
    const form = guessGenreComponent.find(`.game__tracks`);
    form.simulate(`submit`, {preventDefault: () => {}});

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(expect.any(Array));
  });

  it(`Rendered checkboxes are synchronized with state`, () => {
    const form = guessGenreComponent.find(`.game__tracks`);
    form.simulate(`submit`, {preventDefault: () => {}});

    expect(clickHandler.mock.calls[0][0]).toEqual([false, false, false, false]);
  });
});
