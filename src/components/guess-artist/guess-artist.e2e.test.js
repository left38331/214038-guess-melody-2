import React from 'react';
import {GuessArtist} from "components/guess-artist/guess-artist";
import {shallow} from 'enzyme';
import {questions} from "../../mocks/questions";

const question = questions[0];

it(`Test click on of answer in guess artist component`, () => {
  const clickHandler = jest.fn();
  const props = {
    question,
    screenIndex: 0,
    onAnswer: () => {},
    getValue: clickHandler
  };
  const guessArtistComponent = shallow(<GuessArtist {...props}/>);
  const allBtnChoice = guessArtistComponent.find(`.artist__input`);

  allBtnChoice.forEach((btn, i) => {
    btn.simulate(`change`, {target: {value: `answer-${i + 1}`}});
    expect(clickHandler).toBeCalledWith(`answer-${i + 1}`);
  });
});