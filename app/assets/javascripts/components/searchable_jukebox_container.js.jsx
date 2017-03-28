var SearchableJukeboxContainer = React.createClass({
	getInitialState: function() {
		return {
      organKeyListenersRemoved: false,
      previousBlurOrFocusEvent: 'blur',
      searchQuery: '',
      searchQueryBeforeBlurOrFocus: ''
    };
	},

	handleTextInput: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ searchQuery: e.target.value });
  },

  onBlur: function() {
  	this.toggleOrganKeyListeners('blur');
  },

  onFocus: function() {
  	this.toggleOrganKeyListeners('focus');
  },

	render: function() {
		var jukebox;

		if(this.state.searchQuery) {
      ApiActions.fetchTracks('search', this.state.searchQuery);
			jukebox = <Jukebox role="search" />
		} else {
      if(this.state.searchQuery !== this.state.searchQueryBeforeBlurOrFocus) {
        ApiActions.fetchTracks('recent');
      }
			jukebox = <Jukebox role="recent" />
		}

		return (
			<div className="jukebox-search-container">
				<input type="text" placeholder="Search Tracks" id="track-search-input"
          onBlur={ this.onBlur } onFocus={ this.onFocus }
					value={ this.state.searchQuery } onInput={ this.handleTextInput } />
        <i className="fa fa-search track-search-icon" />
				{ jukebox }
			</div>
		)
	},

	toggleOrganKeyListeners: function(eventName) {
		if(this.state.organKeyListenersRemoved) {
			document.addEventListener('keydown', KeyActions.pressKey);
    	document.addEventListener('keyup', KeyActions.releaseKey);
		} else {
			document.removeEventListener('keydown', KeyActions.pressKey);
    	document.removeEventListener('keyup', KeyActions.releaseKey);
		}

		this.setState({
			organKeyListenersRemoved: !this.state.organKeyListenersRemoved,
      previousBlurOrFocusEvent: eventName,
      searchQueryBeforeBlurOrFocus: this.state.searchQuery
		});
	}
});
