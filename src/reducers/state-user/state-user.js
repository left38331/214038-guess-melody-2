const initialState = {
  mistakes: 0,
  isAuthorizationRequired: false,
  email: ``,
  id: ``
};

export const stateUser = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload
    });
    case `REQUIRE_AUTHORIZATION`: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload
    });
    case `SING_IN_USER`: return Object.assign({}, state, {
      email: action.payload.email,
      id: action.payload.id
    });
  }

  return state;
};
