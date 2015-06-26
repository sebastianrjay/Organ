var TrackPlayer = React.createClass({

  deleteTrack: function() {
    TrackActions.deleteTrack(this.props.track);
    ApiActions.deleteTrack(this.props.track);
  },

  getInitialState: function() {
    return { playing: false };
  },

  render: function() {
    var playClass = "", text = "Play";
    if(this.props.track.playing) {
      playClass = " playing", text = "Stop";
    }

    return (
      <div className='track-player'>
        <h5>{ this.props.track.name }</h5>
        <button className={ 'play-button' + playClass }
        onClick={ this.togglePlay }>{ text }</button>
        <button onClick={ this.deleteTrack }>Delete</button>
      </div>
    )
  },

  togglePlay: function() {
    if (this.props.track && this.props.track.playing) {
      this.props.track.stopPlayback();
      this.setState({ playing: false });
    } else if (this.props.track) {
      this.props.track.play();
      this.setState({ playing: true });
    }
  }
});
