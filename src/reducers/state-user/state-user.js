const initialState = {
  mistakes: 0,
};

export const stateUser = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload
    });
  }

  return state;
};
