import React from 'react';
import PropTypes from 'prop-types';

const withUserAnswers = (Component, answersAmount = 4) => {
  class WithUserAnswers extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        userAnswer: new Array(answersAmount).fill(false)
      };

      this._setStateUserAnswer = this._setStateUserAnswer.bind(this);
    }

    _setStateUserAnswer(userAnswers) {
      this.setState({userAnswer: userAnswers});
    }

    render() {
      return <Component
        {...this.props}
        stateUserAnswers={this.state.userAnswer}
        setStateUserAnswer={this._setStateUserAnswer}
      />;
    }
  }

  WithUserAnswers.propTypes = {
    question: PropTypes.shape({
      type: PropTypes.string.isRequired,
      answers: PropTypes.arrayOf(PropTypes.object),
      genre: PropTypes.string.isRequired
    }),
  };

  return WithUserAnswers;
};

export default withUserAnswers;
