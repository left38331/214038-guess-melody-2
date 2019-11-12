import React from 'react';
import {GuessArtist} from 'components/guess-artist/guess-artist';
import {shallow} from 'enzyme';
import {questions} from '../../mocks/questions';

const question = questions[0];

it(`Test click on of answer in guess artist component`, () => {
  const clickHandler = jest.fn();
  const renderPlayer = jest.fn();
  const props = {
    question,
    onUserAnswer: clickHandler,
    onTimeTick: () => {},
    mistakes: 0,
    time: 300,
    renderPlayer
  };
  const guessArtistComponent = shallow(<GuessArtist {...props}/>);
  const btnChoiceFirst = guessArtistComponent.find(`.artist__input`).at(0);

  btnChoiceFirst.simulate(`change`);
  expect(clickHandler).toBeCalledWith(question.answers[0]);
});
