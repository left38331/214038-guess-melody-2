import React from 'react';
import PropTypes from 'prop-types';
import {WelcomeScreen} from 'components/welcome-screen/welcome-screen';
import {GuessArtist} from 'components/guess-artist/guess-artist';
import {GuessGenre} from 'components/guess-genre/guess-genre';

export class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const {questions} = props;

    this.getValueForAnswer = this.getValueForAnswer.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
    this.formSubmitHandler = this.formSubmitHandler.bind(this);
    this.questions = questions;
    this.state = {
      question: -1,
      userAnswers: []
    };
  }

  getScreen() {
    const {gameTime, errorCount, questions} = this.props;
    const {question} = this.state;

    if (question === -1) {
      return <WelcomeScreen
        time={gameTime}
        errorCount={errorCount}
        onStartButtonClick={this.changeScreen}
      />;
    }

    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`:
        return <GuessGenre
          question={currentQuestion}
          formSubmitHandler={this.formSubmitHandler}
          getValueForAnswer={this.getValueForAnswer}
        />;

      case `artist`:
        return <GuessArtist
          question={currentQuestion}
          formSubmitHandler={this.formSubmitHandler}
          getValueForAnswer={this.getValueForAnswer}
        />;
    }

    return null;
  }

  formSubmitHandler(evt) {
    evt.preventDefault();
    this.changeScreen();
  }

  getValueForAnswer(evt) {
    const answer = evt.target.id;
    const isChecked = evt.target.checked;

    if (isChecked) {
      this.setState((prevState) => prevState.userAnswers.push(answer));
    } else {
      this.setState((prevState) => {
        const index = prevState.userAnswers.indexOf(answer);

        return prevState.userAnswers.splice(index, 1);
      });
    }
  }

  clearState() {
    this.setState({
      [`userAnswers`]: []
    });
  }

  changeScreen() {
    this.setState((state) => ({
      question: this.questions.length > state.question + 1 ? state.question + 1 : -1
    }), () => this.clearState());
  }

  render() {
    return this.getScreen();
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  errorCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
};
