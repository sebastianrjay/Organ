var TrackPlayer = React.createClass({

  deleteTrack: function() {
    TrackActions.deleteTrack(this.props.track);
    ApiActions.deleteTrack(this.props.track);
  },

  render: function() {
    var playClass = " fa fa-play", deleteButton = "", stopButton = "";
    if(this.props.track.playing) {
      playClass = " fa fa-pause";
      stopButton = <button><span className='stop-button fa fa-stop'
          onClick={ this.props.track.stopPlayback.bind(this.props.track) }>
          </span></button>
    }

    if(this.props.track.paused) playClass = " fa fa-play";

    if(this.props.track.deletable) {
      deleteButton =
        <button><span onClick={ this.deleteTrack }>Delete</span></button>
    }

    return (
      <div className='track-player-container'>
        <div className='track-player'>
          <h5>"{ this.props.track.name }"</h5>
          <h6>{ this.props.track.composer }</h6>
          <div className='track-player-controls'>
            <button><span className={ 'play-button' + playClass }
            onClick={ this.togglePlay }></span></button>
            { stopButton }
            { deleteButton }
          </div>
        </div>
      </div>
    )
  },

  togglePlay: function() {
    if ((this.props.track || {}).playing && !this.props.track.paused) {
      this.props.track.pausePlayback();
      this.forceUpdate();
    } else if (this.props.track) {
      this.props.track.play();
      this.forceUpdate();
    }
  }
});
