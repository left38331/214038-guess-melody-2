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
    isPlaying: false,
    onPlayButtonClick: clickHandler,
    src: question.answers[0].src
  };
  const audioPlayerComponent = mount(<AudioPlayer {...props}/>);

  it(`Test "true": check getting prop isPlaying when click on "play" button`, () => {
    audioPlayerComponent.setProps({isPlaying: true});

    expect(audioPlayerComponent.find(`.track__button--pause`).exists()).toBeTruthy();
    expect(audioPlayerComponent.find(`.track__button--play`).exists()).toBeFalsy();
  });

  it(`Test "false": check getting prop isPlaying when click on "play" button`, () => {
    audioPlayerComponent.setProps({isPlaying: false});

    expect(audioPlayerComponent.find(`.track__button--play`).exists()).toBeTruthy();
    expect(audioPlayerComponent.find(`.track__button--pause`).exists()).toBeFalsy();
  });
});
