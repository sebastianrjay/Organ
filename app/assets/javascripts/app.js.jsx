$(function() {
  if (typeof User !== "undefined" && User.loggedIn) {
    var organ = React.createElement(Organ, {});
    var recentOrSearchedTracks = 
        React.createElement(SearchableJukeboxContainer, {});
    var recorder = React.createElement(Recorder, {});
    var userTracks = React.createElement(Jukebox, { role: 'user' });

    ReactDOM.render(organ, document.getElementById('organ'));
    ReactDOM.render(recentOrSearchedTracks, 
        document.getElementById('recent-or-searched-tracks'));
    ReactDOM.render(recorder, document.getElementById('recorder'));
    ReactDOM.render(userTracks, document.getElementById('user-tracks'));
  }
});
