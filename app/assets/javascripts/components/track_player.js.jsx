var TrackPlayer = React.createClass({

  deleteTrack: function() {
    TrackActions.deleteTrack(this.props.track);
  },

  getInitialState: function() {
    return { playing: false };
  },

  playTrack: function() {
    this.setState({ playing: true });
    this.props.track.play();
  },

  render: function() {
    this.state.playing ? playClass = " playing" : playClass = "";

    return (
      <div className='track-player'>
        <h5>{ this.props.track.name }</h5>
        <button className={ 'play-button' + playClass }
        onClick={ this.playTrack }>Play</button>
        <button onClick={ this.deleteTrack }>Delete</button>
      </div>
    )
  }
});
