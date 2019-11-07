import React from 'react';
import PropTypes from 'prop-types';

export class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const audio = this._audioRef.current;

    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  render() {
    return <React.Fragment>
      <button className={`track__button track__button--${this.props.isPlaying ? `pause` : `play`}`} type="button" onClick={this.props.onPlayButtonClick} ></button>
      <div className="track__status">
        <audio ref={this._audioRef} src={this.props.src}/>
      </div>
    </React.Fragment>;
  }
}

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
