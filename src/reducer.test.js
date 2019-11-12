import {ActionCreator} from './reducer';
import {reducer} from './reducer';

describe(`Action creators works correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload when user answered correct in artist choice`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `correct`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload when user answered incorrect in artist choice`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload when user answered correct in genre choice`, () => {
    expect(ActionCreator.incrementMistake([false, true, false, false], {
      type: `genre`,
      genre: `jazz`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `rock`,
          src: ``
        }
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload when user answered incorrect in genre choice`, () => {
    expect(ActionCreator.incrementMistake([false, true, false, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `rock`,
          src: ``
        }
      ]
    }, 0, Infinity)).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1
    });
  });

  it(`Action creator resets state if user is answered incorrectly and number of mistakes more than 2`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``
      },
      answers: [
        {
          artist: `correct`,
          picture: ``
        },
        {
          artist: `incorrect`,
          picture: ``
        },
        {
          artist: `incorrect-2`,
          picture: ``
        }
      ]
    }, Infinity, 0)).toEqual({
      type: `RESET`
    });

    expect(ActionCreator.incrementMistake([false, true, false, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `rock`,
          src: ``
        },
        {
          genre: `jazz`,
          src: ``
        },
        {
          genre: `blues`,
          src: ``
        },
        {
          genre: `rock`,
          src: ``
        }
      ]
    }, Infinity, 0)).toEqual({
      type: `RESET`
    });
  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
      time: 300
    });
  });
});
