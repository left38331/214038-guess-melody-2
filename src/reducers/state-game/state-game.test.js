import {stateGame} from './state-game';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(stateGame(undefined, {})).toEqual({
      step: -1,
      time: 300
    });
  });
});
