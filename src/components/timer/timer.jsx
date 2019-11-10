import React from 'react';
import PropTypes from "prop-types";

const SECONDS_IN_MINUTE = 60;

export class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.timerInterval = null;
    this._tick = this._tick.bind(this);
  }

  componentDidMount() {
    this.timerInterval = setInterval(this._tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  _tick() {
    if (this.props.time > 0) {
      this.props.onTimeTick();
    } else {
      clearInterval(this.timerInterval);
      this.props.onTimeTick(true);
    }
  }

  render() {
    const {time} = this.props;
    let min = Math.floor(time / SECONDS_IN_MINUTE);
    min = (min < 10) ? `0${min}` : min;
    let sec = time - min * SECONDS_IN_MINUTE;
    sec = (sec < 10) ? `0${sec}` : sec;

    return <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">{min}</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">{sec}</span>
    </div>;
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  onTimeTick: PropTypes.func.isRequired,
};
