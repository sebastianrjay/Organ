var Key = React.createClass({

  componentDidMount: function() {
    KeyStore.addChangeListener(this._onChange);
    this.note = new Note(KeyboardNotes[this.props.keyName]);
  },

  getInitialState: function() {
    return { style: 'released' };
  },

  handleMousePress: function() {
    KeyActions.handleMouseInput(this.props.keyName, KeyConstants.KEY_PRESSED);
  },

  handleMouseUp: function() {
    KeyActions.handleMouseInput(this.props.keyName, KeyConstants.KEY_RELEASED);
  },

  _onChange: function() {
    if(KeyStore.pressedKeys()[this.props.keyName]) {
      this.note.start();
      this.setState({ keyState: 'pressed' });
    } else {
      this.note.stop();
      this.setState({ keyState: 'released' });
    }
  },

  render: function() {
    return (
      <div onMouseDown={ this.handleMousePress } onMouseUp={ this.handleMouseUp }
      className={ 'key ' + this.props.color + ' ' + this.state.keyState }
      style={ this.props.style } />
    );
  }
});
