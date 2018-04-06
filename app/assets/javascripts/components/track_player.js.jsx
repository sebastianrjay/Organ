var TrackPlayer = React.createClass({

  deleteTrack: function() {
    TrackActions.deleteTrack(this.props.track, this.props.role);
    ApiActions.deleteTrack(this.props.track);
  },

  render: function() {
    var isDeletable = this.props.track.deletable,
        onStop = this.props.track.stopPlayback.bind(this.props.track),
        isPaused = this.props.track.paused,
        isPlaying = this.props.track.playing,
        playbackButtonType = isPlaying && !isPaused ? 'pause' : 'play';

    return (
      <div className='track-player-container'>
        <div className='track-player'>
          <h5>"{ this.props.track.name }"</h5>
          <h6>{ this.props.track.composer }</h6>
          <div className='track-player-controls'>
            <Button type={playbackButtonType} onClick={this.togglePlay}/>
            <Button type='stop' onClick={onStop} showButton={isPlaying}/>
            <Button type='delete' onClick={this.deleteTrack} showButton={isDeletable}/>
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
