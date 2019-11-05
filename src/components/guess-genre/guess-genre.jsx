import React from 'react';
import PropTypes from 'prop-types';
import {AudioPlayer} from 'components/audio-player/audio-player';

export class GuessGenre extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: null
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

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"></div>
          <div className="wrong"></div>
          <div className="wrong"></div>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите инди-рок треки</h2>
        <form className="game__tracks" onSubmit={this.props.formSubmitHandler}>

          {this.props.question.answers.map((it, i) => {
            return <div className="track" key={it.id}>
              <AudioPlayer
                isPlaying={i === this.state.activePlayer}
                src={it.src}
                onPlayButtonClick={() => this.setState({
                  activePlayer: this.state.activePlayer === i ? null : i
                })}
              />
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i + 1}`} id={it.id} onChange={this.props.getValueForAnswer} />
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
  formSubmitHandler: PropTypes.func.isRequired,
  getValueForAnswer: PropTypes.func.isRequired
};
