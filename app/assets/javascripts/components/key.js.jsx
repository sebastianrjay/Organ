var Key = React.createClass({

  componentDidMount: function() {
    KeyStore.addChangeListener(this._onChange);
    this.note = new Note(KeyboardNotes[this.props.keyName]);
  },

  getInitialState: function() {
    return { keyState: 'released' };
  },

  handleMousePress: function() {
    KeyActions.handleMouseInput(this.props.keyName, KeyConstants.KEY_PRESSED);
  },

  handleMouseUp: function() {
    KeyActions.handleMouseInput(this.props.keyName, KeyConstants.KEY_RELEASED);
  },

  _onChange: function() {
    if (KeyStore.pressedKeys()[this.props.keyName]) {
      this.note.start();
      this.setState({ keyState: 'pressed' });
    } else {
      this.note.stop();
      this.setState({ keyState: 'released' });
    }
  },

  render: function() {
    var _specialKeyNames = { 'º': ";", 'þ': "'" };
    var keyName = _specialKeyNames[this.props.keyName] || this.props.keyName;

    return (
      <div onMouseDown={ this.handleMousePress } onMouseUp={ this.handleMouseUp }
      className={ 'key ' + this.props.color + ' ' + this.state.keyState }
      style={ this.props.style }>
        <p className={ 'key-name ' + this.props.color }>{ keyName }</p>
      </div>
    );
  }
});
