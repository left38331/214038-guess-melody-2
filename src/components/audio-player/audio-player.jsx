import React from 'react';
import PropTypes from 'prop-types';

export class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = React.createRef();
    this.state = {
      isPlaying: props.isPlaying,
    };

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }

  componentDidMount() {
    const audio = this._audioRef.current;

    audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    audio.onpause = () => {
      this.setState({
        isPlaying: false,
      });
    };
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;

    audio.onplay = null;
    audio.onpause = null;
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;

    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  _onPlayButtonClick() {
    this.props.onPlayButtonClick();
    this.setState({isPlaying: !this.state.isPlaying});
  }

  render() {
    return <React.Fragment>
      <button className={`track__button track__button--${this.state.isPlaying ? `pause` : `play`}`} type="button" onClick={this._onPlayButtonClick} ></button>
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
