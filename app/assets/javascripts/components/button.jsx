var iconClasses = {
  delete: 'fa fa-trash',
  pause: 'fa fa-pause',
  play: 'fa fa-play',
  save: 'fa fa-save',
  stop: 'fa fa-stop'
};

var Button = React.createClass({
  render: function() {
    if (this.props.showButton !== false) {
      return (
        <button onClick={this.props.onClick}>
          <i className={iconClasses[this.props.type]}></i>
        </button>
      )
    } else return null;
  }
});
