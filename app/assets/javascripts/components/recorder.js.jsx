var Recorder = React.createClass({

  componentDidMount: function() {
    this.track = null;
    KeyStore.addChangeListener(this._onKeyStoreChange);
    TrackStore.addChangeListener(this._onTrackStoreChange);
  },

  deleteTrack: function() {
    if (this.track.playing) this.track.stopPlayback();
    this.resetTrackState();
  },

  getInitialState: function() {
    return { recording: false, playing: false, doneRecording: false,
      trackName: '' };
  },

  handleTextInput: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ trackName: e.target.value });
  },

  _onKeyStoreChange: function() {
    if (this.track && this.track.recording) {
      this.track.addNotes(KeyStore.pressedKeys());
    }
  },

  _onTrackStoreChange: function() {
    if (this.track) {
      this.setState({ playing: this.track.playing });
    }
  },

  render: function() {
    this.toggleKeyboardEventListeners();
    var deletable = this.state.doneRecording || this.state.recording,
        doneRecording = this.state.doneRecording,
        recording = this.state.recording;

    return (
      <div className='recorder'>
        <RecordButton onClick={this.toggleRecord} recording={recording}/>
        <Button type='play' onClick={this.togglePlay} showButton={doneRecording}/>
        {
          doneRecording ?
            <input
              type='text'
              placeholder='Song Title'
              value={this.state.trackName}
              onChange={this.handleTextInput}
            />
          : null
        }
        <Button type='save' onClick={this.saveTrack} showButton={doneRecording}/>
        <Button type='delete' onClick={this.resetTrackState} showButton={deletable}/>
      </div>
    )
  },

  resetTrackState: function() {
    this.track = null;
    this.setState({
      playing: false,
      recording: false,
      doneRecording: false,
      trackName: ''
    });
  },

  saveTrack: function() {
    this.track.name = this.state.trackName;
    TrackActions.addUserTrack(this.track);
    ApiActions.saveTrack(this.track);
    this.track = null;
    this.setState({ doneRecording: false, trackName: '' });
  },

  toggleKeyboardEventListeners: function() {
    if (this.state.doneRecording) {
      document.removeEventListener('keydown', KeyActions.pressKey);
      document.removeEventListener('keyup', KeyActions.releaseKey);
    } else {
      document.addEventListener('keydown', KeyActions.pressKey);
      document.addEventListener('keyup', KeyActions.releaseKey);
    }
  },

  togglePlay: function() {
    if (this.track && this.track.playing) {
      this.track.stopPlayback();
      this.setState({ playing: false });
    } else if (this.track) {
      this.track.play();
      this.setState({ playing: true });
    }
  },

  toggleRecord: function() {
    if (!this.track) this.track = new Track();

    if (!this.track.recording){
      this.track.record();
      this.setState({ recording: true, doneRecording: false });
    } else {
      this.track.stopRecording();
      this.setState({ recording: false, doneRecording: true });
    }
  }
});
