import React from 'react';
import PropTypes from 'prop-types';
import {WelcomeScreen} from 'components/welcome-screen/welcome-screen';
import {GuessArtist} from "components/guess-artist/guess-artist";
import {GuessGenre} from "components/guess-genre/guess-genre";

export class App extends React.PureComponent {
  static getScreen(question, props, onUserAnswer, getValue) {
    const {gameTime, errorCount, questions} = props;

    if (question === -1) {
      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onStartButtonClick={onUserAnswer}
      />;
    }

    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`: return <GuessGenre
        question={currentQuestion}
        onAnswer={onUserAnswer}
        screenIndex={question}
        getValue={getValue}
      />;

      case `artist`: return <GuessArtist
        question={currentQuestion}
        onAnswer={onUserAnswer}
        screenIndex={question}
        getValue={getValue}
      />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    const {questions} = props;

    this.getValue = this.getValue.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.questions = questions;
    this.state = {
      question: -1
    };
  }

  getValue(evt) {
    const key = evt.target.value;
    const value = evt.target.checked;

    this.setState({[key]: value});
  }

  // вызываю на 68 строке, там пояснение, просто для себя чекал стэйт.
  checkUserAnswers() {
    // console.log(this.state);
  }

  clearState() {
    this.setState({[`answer-1`]: false});
    this.setState({[`answer-2`]: false});
    this.setState({[`answer-3`]: false});
    this.setState({[`answer-4`]: false});
  }

  changeScreen() {
    this.setState((state) => ({
      question: this.questions.length > state.question + 1 ? state.question + 1 : -1
    }), () => {
      this.checkUserAnswers(); // могу предположить что тут будет проверка, правильно ли ответил юзер, я бы ее вставил перед этой this.setState, но из-за асинхронности сетСтэйт не всегда успевает записаться новое значение в state
      this.clearState();
    });
  }

  render() {
    const {question} = this.state;

    return App.getScreen(question, this.props, this.changeScreen, this.getValue);
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
};
