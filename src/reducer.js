import api from './api';

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (userAnswer, question) => userAnswer.every((it, i) => it === (
  question.answers[i].genre === question.genre
));

const initialState = {
  step: -1,
  mistakes: 0,
  time: 300,
  questions: []
};

export const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1
  }),

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1
    };
  },

  decrementTime: (stop) => {
    if (stop) {
      return {
        type: `RESET`
      };
    }

    return {
      type: `DECREMENT_TIME`,
      payload: 1
    };
  },

  loadQuestions: (questions) => {
    return {
      type: `LOAD_QUESTIONS`,
      payload: questions
    };
  }
};

export const Operation = {
  loadQuestions: () => (dispatch) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`: return Object.assign({}, state, {
      step: state.step + action.payload
    });

    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload
    });

    case `DECREMENT_TIME`: return Object.assign({}, state, {
      time: state.time - action.payload
    });

    case `LOAD_QUESTIONS`: return Object.assign({}, state, {
      questions: action.payload
    });

    case `RESET`: return Object.assign({}, initialState);
  }

  return state;
};
