var Key = React.createClass({

  componentDidMount: function() {
    KeyStore.addChangeListener(this._onChange);
    this.note = new Note(KeyboardNotes[this.props.noteName]);
  },

  getInitialState: function() {
    return { style: 'released' };
  },

  handleMousePress: function() {
    KeyActions.handleMousePress(this.props.noteName);
  },

  handleMouseUp: function() {
    KeyActions.handleMouseUp(this.props.noteName);
  },

  _onChange: function() {
    if(KeyStore.pressedKeys()[this.props.noteName]) {
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
