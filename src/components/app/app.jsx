import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from 'actions/actions-creator';
import {WelcomeScreen} from 'components/welcome-screen/welcome-screen';
import {GuessArtist} from 'components/guess-artist/guess-artist';
import {GuessGenre} from 'components/guess-genre/guess-genre';
import withActivePlayer from 'hocs/with-active-player/with-active-player';
import withUserAnswers from 'hocs/with-user-answers/with-user-answers';
import withAuthorizationScreen from 'hocs/with-authorization-screen-wrapped/with-authorization-screen-wrapped';
import {AuthorizationScreen} from 'components/authorizationScreen/authorization-screen';
import {Operation} from 'actions/async-actions';

const GuessGenreWrapped = withUserAnswers(withActivePlayer(GuessGenre));
const GuessArtistWrapped = withActivePlayer(GuessArtist);
const AuthorizationScreenWrapped = withAuthorizationScreen(AuthorizationScreen);

export class App extends React.PureComponent {
  getScreen() {
    const {mistakes, maxMistakes, questions, onWelcomeScreenClick, step, onUserAnswer, isAuthorizationRequired, requireAuthorization} = this.props;

    if (!isAuthorizationRequired) {
      return <AuthorizationScreenWrapped
        onSubmit={requireAuthorization}
      />;
    }

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
  isAuthorizationRequired: PropTypes.bool.isRequired,
  requireAuthorization: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.stateGame.step,
  mistakes: state.stateUser.mistakes,
  maxMistakes: state.stateGame.maxMistakes,
  questions: state.appData.questions,
  isAuthorizationRequired: state.stateUser.isAuthorizationRequired
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
  requireAuthorization: (userData) => {
    dispatch(Operation.postUserLogin(userData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
