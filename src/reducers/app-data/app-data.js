const initialState = {
  questions: []
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case `LOAD_QUESTIONS`: return Object.assign({}, state, {
      questions: action.payload
    });
  }

  return state;
};
