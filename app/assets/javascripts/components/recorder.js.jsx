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
    var recordClass, playClass, input, saveButton;

    this.state.recording ? recordClass = " recording" : recordClass = "";
    this.state.playing ? playClass = " playing" : playClass = "";

    if(this.state.doneRecording) {
      document.removeEventListener('keydown', KeyActions.pressKey);
      document.removeEventListener('keyup', KeyActions.releaseKey);
      input = <input type="text" className='new-track-input'
        value={ this.state.formInput } onChange={ this.handleTextInput } />
      saveButton = <button className='save-button'
        onClick={ this.save }>Save</button>;
    } else {
      document.addEventListener('keydown', KeyActions.pressKey);
      document.addEventListener('keyup', KeyActions.releaseKey);
      input = "";
      saveButton = "";
    }

    return (
      <div className='recorder'>
        <button className={ 'record-button' + recordClass }
        onClick={ this.toggleRecord }>Record</button>
        <button className={ 'play-button' + playClass }
        onClick={ this.togglePlay }>Play</button>
        { this.state.doneRecording ? saveButton : "" }
        { input }
      </div>
    )
  },

  save: function() {
    var newTrack = this.tracks[this.tracks.length - 1];
    newTrack.name = this.state.formInput;
    TrackActions.addTrack(newTrack);
    ApiActions.saveTrack(newTrack);
    this.setState({ doneRecording: false, formInput: "" });
  },

  togglePlay: function() {
    if (this.tracks && this.tracks[this.tracks.length - 1].playing) {
      this.tracks[this.tracks.length - 1].stopPlayback();
      this.setState({ playing: false });
    } else if (this.tracks) {
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
