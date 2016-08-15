var SearchableJukeboxContainer = React.createClass({
	getInitialState: function() {
		return { searchQuery: '', organKeyListenersRemoved: false };
	},

	handleTextInput: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ searchQuery: e.target.value });
  },

  onBlur: function() {
  	this.toggleOrganKeyListeners();
  },

  onFocus: function() {
  	this.toggleOrganKeyListeners();
  },

	render: function() {
		var jukebox;

		if(this.state.searchQuery) {
      ApiActions.fetchTracks('search', this.state.searchQuery);
			jukebox = <Jukebox role="search" />
		} else {
      ApiActions.fetchTracks('recent')
			jukebox = <Jukebox role="recent" />
		}

		return (
			<div className="jukebox-search-container"
				onBlur={ this.onBlur } onFocus={ this.onFocus }>
				<input type="text" placeholder="Search Tracks" id="track-search-input"
					value={ this.state.searchQuery } onChange={ this.handleTextInput } />
        <i className="fa fa-search track-search-icon" />
				{ jukebox }
			</div>
		)
	},

	toggleOrganKeyListeners: function() {
		if(this.state.organKeyListenersRemoved) {
			document.addEventListener('keydown', KeyActions.pressKey);
    	document.addEventListener('keyup', KeyActions.releaseKey);
		} else {
			document.removeEventListener('keydown', KeyActions.pressKey);
    	document.removeEventListener('keyup', KeyActions.releaseKey);
		}

		this.setState({
			organKeyListenersRemoved: !this.state.organKeyListenersRemoved
		});
	}
});
