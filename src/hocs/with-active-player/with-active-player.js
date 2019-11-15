import React from 'react';

import {AudioPlayer} from 'components/audio-player/audio-player';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: null
      };
    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={(it) => {
          return <AudioPlayer
            isPlaying={it.id === this.state.activePlayerId}
            src={it.src}
            onPlayButtonClick={() => this.setState({
              activePlayerId: this.state.activePlayerId === it.id ? null : it.id
            })}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
