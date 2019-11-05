import React from 'react';
import {AudioPlayer} from 'components/audio-player/audio-player';
import {mount} from 'enzyme';
import {questions} from '../../mocks/questions';

const question = questions[1];

describe(`Testing AudioPlayer`, () => {
  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  const clickHandler = jest.fn();
  const props = {
    isPlaying: true,
    onPlayButtonClick: clickHandler,
    src: question.answers[0].src
  };
  const audioPlayerComponent = mount(<AudioPlayer {...props}/>);

  it(`Test "true": check state when click on "play" button`, () => {
    audioPlayerComponent.setState({isPlaying: false});

    const button = audioPlayerComponent.find(`.track__button`);

    button.simulate(`click`);
    expect(audioPlayerComponent.state().isPlaying).toEqual(true);
  });

  it(`Test "false": check state when click on "play" button`, () => {
    const button = audioPlayerComponent.find(`.track__button`);

    button.simulate(`click`);
    expect(audioPlayerComponent.state().isPlaying).toEqual(false);
  });
});
