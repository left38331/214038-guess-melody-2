import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer';
import {WelcomeScreen} from 'components/welcome-screen/welcome-screen';
import {GuessArtist} from 'components/guess-artist/guess-artist';
import {GuessGenre} from 'components/guess-genre/guess-genre';

export class App extends React.PureComponent {
  getScreen() {
    const {mistakes, maxMistakes, questions, onWelcomeScreenClick, step, onUserAnswer, time, onTimeTick} = this.props;

    if (step === -1) {
      return <WelcomeScreen
        time={time}
        errorCount={maxMistakes}
        onStartButtonClick={onWelcomeScreenClick}
      />;
    }

    const currentQuestion = questions[step];

    if (currentQuestion) {
      switch (currentQuestion.type) {
        case `genre`:
          return <GuessGenre
            time={time}
            onTimeTick={onTimeTick}
            mistakes={mistakes}
            question={currentQuestion}
            onUserAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, maxMistakes)}
          />;

        case `artist`:
          return <GuessArtist
            time={time}
            onTimeTick={onTimeTick}
            mistakes={mistakes}
            question={currentQuestion}
            onUserAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, maxMistakes)}
          />;
      }
    }

    return null;
  }

  render() {
    return this.getScreen();
  }
}

App.propTypes = {
  time: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onTimeTick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
  time: state.time
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question,
        mistakes,
        maxMistakes
    ));
  },
  onTimeTick: (time) => dispatch(ActionCreator.decrementTime(time))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
