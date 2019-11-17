import api from '../api';
import {ActionCreator} from './actions-creator';

export const Operation = {
  loadQuestions: () => (dispatch) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  }
};
