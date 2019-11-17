import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import App from 'components/app/app';
import {settings} from './mocks/questions';
import {stateUser} from './reducers/state-user/state-user';
import {appData} from './reducers/app-data/app-data';
import {stateGame} from './reducers/state-game/state-game';
import {Operation} from './actions/async-actions';

const init = () => {
  const reducer = combineReducers({
    stateUser,
    stateGame,
    appData
  });

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <App
      maxMistakes={settings.errorCount}
    />
  </Provider>,
  document.querySelector(`#root`)
  );
};

init();
