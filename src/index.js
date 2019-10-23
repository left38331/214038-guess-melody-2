import React from 'react';
import ReactDOM from 'react-dom';
import {App} from 'components/app/app';
import {settings, questions} from "./mocks/questions";

const init = () => {
  ReactDOM.render(
      <App
        errorCount={settings.errorCount}
        gameTime={settings.gameTime}
        questions={questions}
      />,
      document.querySelector(`#root`)
  );
};

init();
