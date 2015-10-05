var Recorder = React.createClass({

  cancelSaveTrack: function() {
    this.setState({ recording: false, doneRecording: false });
  },

  componentDidMount: function() {
    this.track = null;
    KeyStore.addChangeListener(this._onKeyStoreChange);
    TrackStore.addChangeListener(this._onTrackStoreChange);
  },

  deleteTrack: function() {
    if (this.track.playing) {
      this.track.stopPlayback();
    }
    this.track = null;
    this.setState({ recording: false, doneRecording: false, formInput: "" });
  },

  getInitialState: function() {
    return { recording: false, playing: false, doneRecording: false,
      formInput: "" };
  },

  handleTextInput: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ formInput: e.target.value });
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
    var recordClass = "", playClass = "", playText = "Stop", input, saveButton,
        deleteButton = "", playButton = "", cancelButton,
        recordText = "Stop Recording";

    this.state.recording ? recordClass = " recording" : recordText = "Record";
    this.state.playing ? playClass = " playing" : playText = "Play";

    if (this.track) {
      deleteButton = <button className='delete-button'
        onClick={ this.deleteTrack }>Delete</button>
      playButton = <button className={ 'play-button' + playClass }
      onClick={ this.togglePlay }>{ playText }</button>
    }

    if(this.state.doneRecording) {
      document.removeEventListener('keydown', KeyActions.pressKey);
      document.removeEventListener('keyup', KeyActions.releaseKey);
      input = <input type="text" className='new-track-input' placeholder="Song Title"
        value={ this.state.formInput } onChange={ this.handleTextInput } />
      saveButton = <button className='save-button'
        onClick={ this.saveTrack }>Save</button>;
      cancelButton = <button className='cancel-button'
        onClick={ this.cancelSaveTrack }>Cancel</button>
    } else {
      document.addEventListener('keydown', KeyActions.pressKey);
      document.addEventListener('keyup', KeyActions.releaseKey);
      input = "", saveButton = "", cancelButton = "";
    }

    return (
      <div className='recorder'>
        <button className={ 'record-button' + recordClass }
        onClick={ this.toggleRecord }>{ recordText }</button>
        { playButton }
        { input }
        { saveButton }
        { cancelButton }
        { deleteButton }
      </div>
    )
  },

  saveTrack: function() {
    this.track.name = this.state.formInput;
    TrackActions.addUserTrack(this.track);
    ApiActions.saveTrack(this.track);
    this.track = null;
    this.setState({ doneRecording: false, formInput: "" });
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
    if (!this.track){
      this.track = new Track();
      this.track.record();
      this.setState({ recording: true, doneRecording: false });
    } else if (!this.track.recording){
      this.track.record();
      this.setState({ recording: true, doneRecording: false });
    } else {
      this.track.stopRecording();
      this.setState({ recording: false, doneRecording: true });
    }
  }
});
