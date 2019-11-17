const initialState = {
  step: -1,
  time: 300
};

export const stateGame = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`: return Object.assign({}, state, {
      step: state.step + action.payload
    });

    case `DECREMENT_TIME`: return Object.assign({}, state, {
      time: state.time - action.payload
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};
