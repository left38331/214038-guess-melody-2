import {stateUser} from './state-user';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(stateUser(undefined, {})).toEqual({
      mistakes: 0
    });
  });
});
