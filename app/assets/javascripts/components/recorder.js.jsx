var Recorder = React.createClass({

  componentDidMount: function() {
    this.tracks = null;
    KeyStore.addChangeListener(this._onKeyStoreChange);
  },

  getInitialState: function() {
    return { recording: false, playing: false, doneRecording: false,
      formInput: "" };
  },

  handleTextInput: function(e) {
    // debugger
    e.stopPropagation();
    e.preventDefault();
    this.setState({ formInput: e.target.value });
  },

  _onKeyStoreChange: function() {
    if (this.tracks && this.tracks[this.tracks.length - 1].recording) {
      this.tracks[this.tracks.length - 1].addNotes(KeyStore.pressedKeys());
    }
  },

  render: function() {
    var recordClass, playClass;

    this.state.recording ? recordClass = " recording" : recordClass = "";
    this.state.playing ? playClass = " playing" : playClass = "";
    var saveButton = <button className='save-button' onClick={ this.save }>Save</button>;
    var input;
    if(this.state.doneRecording) {
      document.removeEventListener('keydown', KeyActions.pressKey);
      document.removeEventListener('keyup', KeyActions.releaseKey);
      input = <input type="text" className='new-track-input'
        value={ this.state.formInput } onChange={ this.handleTextInput } />
    }

    return (
      <div className='recorder'>
        <button className={ 'record-button' + recordClass }
        onClick={ this.toggleRecord }>Record</button>
        <button className={ 'play-button' + playClass }
        onClick={ this.togglePlay }>Play</button>
        { this.state.doneRecording ? saveButton : "" }
        { this.state.doneRecording ? input : "" }
      </div>
    )
  },

  save: function() {
    TrackActions.addTrack(this.tracks[this.tracks.length - 1]);
    ApiActions.saveTrack(this.tracks[this.tracks.length - 1]);
  },

  togglePlay: function() {
    if(this.track.playing) {
      this.tracks[this.tracks.length - 1].stopPlayback();
      this.setState({ playing: false });
    } else {
      this.tracks[this.tracks.length - 1].play();
      this.setState({ playing: true });
    }
  },

  toggleRecord: function() {
    if (!this.tracks || !this.tracks[this.tracks.length - 1].recording){
      this.tracks = this.tracks || [];
      this.tracks.push(new Track());
      this.tracks[this.tracks.length - 1].record();
      this.setState({ recording: true, doneRecording: false });
    } else {
      this.tracks[this.tracks.length - 1].stopRecording();
      this.setState({ recording: false, doneRecording: true });
    }
  }
});
