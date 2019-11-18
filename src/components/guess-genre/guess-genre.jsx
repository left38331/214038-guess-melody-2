import React from 'react';
import PropTypes from 'prop-types';

import {Mistakes} from 'components/mistakes/mistakes';
import Timer from 'components/timer/timer';

export const GuessGenre = (props) => {
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
      <Mistakes mistakes={props.mistakes}/>;
    </header>

    <section className="game__screen">
      <h2 className="game__title">Выберите {props.question.genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        props.onUserAnswer(props.stateUserAnswers);
      }}>

        {props.question.answers.map((it, i) => {
          return <div className="track" key={i}>
            {props.renderPlayer(it, i)}
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i + 1}`} id={i} checked={props.stateUserAnswers[i]} onChange={() => {
                const userAnswer = [...props.stateUserAnswers]; userAnswer[i] = !userAnswer[i]; props.setStateUserAnswer(userAnswer);
              }} />
              <label className="game__check" htmlFor={i}>Отметить</label>
            </div>
          </div>;
        })}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>;
};

GuessGenre.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object),
    genre: PropTypes.string.isRequired
  }),
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  stateUserAnswers: PropTypes.array.isRequired,
  setStateUserAnswer: PropTypes.func.isRequired,
};
