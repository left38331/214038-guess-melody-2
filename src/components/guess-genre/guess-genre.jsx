import React from 'react';
import PropTypes from 'prop-types';

import {AudioPlayer} from 'components/audio-player/audio-player';
import {Mistakes} from 'components/mistakes/mistakes';
import Timer from 'components/timer/timer';

export class GuessGenre extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayerId: null,
      userAnswer: new Array(props.question.answers.length).fill(false)
    };
  }

  render() {
    return <section className="game game--genre">
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <Timer/>
        <Mistakes mistakes={this.props.mistakes}/>;
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите инди-рок треки</h2>
        <form className="game__tracks" onSubmit={(evt) => {
          evt.preventDefault();
          this.props.onUserAnswer(this.state.userAnswer);
        }}>

          {this.props.question.answers.map((it, i) => {
            return <div className="track" key={it.id}>
              <AudioPlayer
                isPlaying={it.id === this.state.activePlayerId}
                src={it.src}
                onPlayButtonClick={() => this.setState({
                  activePlayerId: this.state.activePlayerId === it.id ? null : it.id
                })}
              />
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i + 1}`} id={it.id} checked={this.state.userAnswer[i]} onChange={() => {
                  const userAnswer = [...this.state.userAnswer]; userAnswer[i] = !userAnswer[i]; this.setState({userAnswer});
                }} />
                <label className="game__check" htmlFor={it.id}>Отметить</label>
              </div>
            </div>;
          })}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>;
  }
}

GuessGenre.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object),
    genre: PropTypes.string.isRequired
  }),
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};
