import {ActionCreator} from './actions-creator';

export const Operation = {
  loadQuestions: () => (dispatch, getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },

  postUserLogin: (userData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: userData.email,
      password: userData.password
    })
      .then((response) => {
        if (response) {
          dispatch(ActionCreator.requireAuthorization(true));
          dispatch(ActionCreator.singInUser(response.data));
        }
      });
  }
};
