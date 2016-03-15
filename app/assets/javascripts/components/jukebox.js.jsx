var Jukebox = React.createClass({

  _onChange: function() {
    this.setState({ tracks: this.tracksGetter() });
  },

  componentDidMount: function() {
    TrackStore.addChangeListener(this._onChange);
  },

  componentWillMount: function() {
    if(this.props.role === 'user') {
      this.tracksGetter = TrackStore.userTracks;
    } else if(this.props.role === 'featured') {
      this.tracksGetter = TrackStore.featuredTracks;
    }
  },

  getInitialState: function() {
    var tracks = this.tracksGetter ? this.tracksGetter() : [];
    return { tracks: tracks };
  },

  userInstructions: function() {
    return (<h4>{ "You haven't recorded any tracks yet! To record a track" +
    ", click the 'Record' button below the keyboard and start playing. When" +
    " finished, click the 'Stop Recording' button. To play the organ, use " +
    "the keys between Caps Lock and Return on your keyboard for the white " +
    "keys, and the keys between q and p for the black keys. You can also" +
    " play a key by selecting and pressing it with the mouse pointer." }</h4>)
  },

  render: function() {
    var content;
    var hText = this.props.role === 'user' ? 'Your Tracks:' : 'Featured Tracks:';
    if(this.props.role == 'user' && this.state.tracks.length === 0) {
      content = this.userInstructions();
    } else if (this.props.role == 'featured' && this.state.tracks.length === 0) {
      content = <h4>{ "Loading..." }</h4>
    } else {
      content = <div className={ 'jukebox ' + this.props.role }>
        { this.state.tracks.map(function(track) {
          return (
            <TrackPlayer track={ track } />
          )
        }) }
      </div>
    }

    return (
      <div className={ 'col-md-12 jukebox-container-' + this.props.role }>
        <h3>{ hText }</h3>
        <br />
        { content }
      </div>
    )
  }
});
