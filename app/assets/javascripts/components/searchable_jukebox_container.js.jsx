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
  	console.log('onBlur callback triggered');
  	this.toggleOrganKeyListeners();
  },

  onFocus: function() {
  	console.log('onChange callback triggered');
  	this.toggleOrganKeyListeners();
  },

	render: function() {
		// need figure out how to listen for click outside of this div
		var jukebox;

		if(this.state.searchQuery) {
			console.log('search jukebox rendered');
      ApiActions.fetchTracks('search', this.state.searchQuery);
			jukebox = <Jukebox role="search" />
		} else {
      ApiActions.fetchTracks('recent')
			console.log('recent jukebox rendered');
			jukebox = <Jukebox role="recent" />
		}

		return (
			<div className="jukebox-search-container"
				onBlur={ this.onBlur } onFocus={ this.onFocus }>
				<input type="text" placeholder="Search Tracks" 
					value={ this.state.searchQuery } onChange={ this.handleTextInput } />
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
			organKeyListenersRemoved: !this.state.organKeyListenersRemoved,
			searchQuery: ''
		});
	}
});
