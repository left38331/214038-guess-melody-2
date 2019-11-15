import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer';
import {WelcomeScreen} from 'components/welcome-screen/welcome-screen';
import {GuessArtist} from 'components/guess-artist/guess-artist';
import {GuessGenre} from 'components/guess-genre/guess-genre';
import withActivePlayer from '../../hocs/with-active-player/with-active-player';
import withUserAnswers from '../../hocs/with-user-answers/with-user-answers';

const GuessGenreWrapped = withUserAnswers(withActivePlayer(GuessGenre));
const GuessArtistWrapped = withActivePlayer(GuessArtist);

export class App extends React.PureComponent {
  getScreen() {
    const {mistakes, maxMistakes, questions, onWelcomeScreenClick, step, onUserAnswer} = this.props;

    if (step === -1) {
      return <WelcomeScreen
        errorCount={maxMistakes}
        onStartButtonClick={onWelcomeScreenClick}
      />;
    }

    const currentQuestion = questions[step];

    if (currentQuestion) {
      switch (currentQuestion.type) {
        case `genre`:
          return <GuessGenreWrapped
            mistakes={mistakes}
            question={currentQuestion}
            onUserAnswer={(userAnswer) => onUserAnswer(userAnswer, currentQuestion, mistakes, maxMistakes)}
          />;

        case `artist`:
          return <GuessArtistWrapped
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
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  onWelcomeScreenClick: PropTypes.func.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
