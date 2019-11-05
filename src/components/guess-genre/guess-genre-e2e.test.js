import React from 'react';
import {GuessGenre} from 'components/guess-genre/guess-genre';
import {shallow} from 'enzyme';
import {questions} from '../../mocks/questions';

const question = questions[1];

it(`Test click on of answer in guess genre component`, () => {
  const clickHandler = jest.fn();
  const props = {
    question,
    formSubmitHandler: clickHandler,
    getValueForAnswer: clickHandler
  };
  const guessArtistComponent = shallow(<GuessGenre {...props}/>);
  const allBtnChoice = guessArtistComponent.find(`.game__input`);

  allBtnChoice.forEach((btn, i) => {
    btn.simulate(`change`, {target: {value: `answer-${i + 1}`, checked: true}});
    expect(clickHandler).toBeCalledWith({target: {value: `answer-${i + 1}`, checked: true}});
  });
});
