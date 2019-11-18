import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from 'components/app/app';
import {stateUser} from './reducers/state-user/state-user';
import {appData} from './reducers/app-data/app-data';
import {stateGame} from './reducers/state-game/state-game';
import createAPI from './api';
import {Operation} from 'actions/async-actions';

const init = () => {
  const appReducer = combineReducers({
    stateUser,
    stateGame,
    appData
  });

  const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
      state = undefined;
    }

    return appReducer(state, action);
  };

  const api = createAPI((...args) => store.dispatch(...args));

  const store = createStore(
      rootReducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
