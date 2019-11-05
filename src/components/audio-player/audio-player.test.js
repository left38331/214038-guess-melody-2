import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from 'components/audio-player/audio-player';
import {questions} from '../../mocks/questions';

const question = questions[1];

it(`render correctly audio-player component`, () => {
  const props = {
    isPlaying: false,
    onPlayButtonClick: () => {},
    src: question.answers[0].src
  };

  const audioPlayerComponent = renderer.create(<AudioPlayer {...props} />, {
    createNodeMock: (element) => {
      if (element.type === `audio`) {
        return {};
      }
      return null;
    }}).toJSON();

  expect(audioPlayerComponent).toMatchSnapshot();
});
