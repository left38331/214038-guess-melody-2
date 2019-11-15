import React from 'react';
import PropTypes from 'prop-types';

import {Mistakes} from 'components/mistakes/mistakes';
import Timer from 'components/timer/timer';

export const GuessArtist = (props) => {
  return <section className="game game--artist">
    <header className="game__header">
      <a className="game__back" href="#">
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
      </svg>

      <Timer/>
      <Mistakes mistakes={props.mistakes}/>
    </header>

    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {props.renderPlayer(props.question.song, 0)}
        </div>
      </div>

      <form className="game__artist">
        {props.question.answers.map((item, i) => {
          return <div className="artist" key={item.id}>
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i + 1}`} id={item.id} onChange={()=> props.onUserAnswer(item)}/>
            <label className="artist__name" htmlFor={item.id}>
              <img className="artist__picture" src={item.picture} alt={item.artist}/>
              {item.artist}
            </label>
          </div>;
        })}
      </form>
    </section>
  </section>;
};

GuessArtist.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object),
    song: PropTypes.object.isRequired
  }),
  onUserAnswer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};
