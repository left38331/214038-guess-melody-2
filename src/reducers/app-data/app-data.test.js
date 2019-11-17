import MockAdapter from 'axios-mock-adapter';

import {appData} from './app-data';
import {Operation} from '../../actions/async-actions';
import api from '../../api';

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(appData(undefined, {})).toEqual({
      questions: []
    });
  });

  it(`Should make a correct API call to /questions`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    api.get(`/questions`);

    return questionLoader(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}]
        });
      });
  });
});
