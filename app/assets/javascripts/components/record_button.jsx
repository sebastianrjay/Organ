var RecordButton = React.createClass({
  render: function() {
    var iconClass = this.props.recording ? 'fa-microphone-slash' : 'fa-microphone';
    var text = this.props.recording ? 'Stop Recording' : 'Record';

    return (
      <button onClick={this.props.onClick}>
        <i className={'fa ' + iconClass}></i> {text}
      </button>
    )
  }
});
