var Jukebox = React.createClass({

  componentDidMount: function() {
    TrackStore.addChangeListener(this._onChange);
  },

  getInitialState: function() {
    return { tracks: TrackStore.tracks() };
  },

  _onChange: function() {
    this.setState({ tracks: TrackStore.tracks() });
  },

  render: function() {
    return (
      <div className='jukebox'>
        { this.state.tracks.map(function(track) {
          return (
            <TrackPlayer track={ track } />
          )
        }) }
      </div>
    )
  }
});
