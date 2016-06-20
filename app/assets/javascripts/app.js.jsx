$(function() {
  if (typeof User !== "undefined" && User.loggedIn) {
    var organ = React.createElement(Organ, {});
    var recentOrSearchedTracks = 
        React.createElement(SearchableJukeboxContainer, {});
    var recorder = React.createElement(Recorder, {});
    var userTracks = React.createElement(Jukebox, { role: 'user' });

    React.render(organ, document.getElementById('organ'));
    React.render(recentOrSearchedTracks, 
        document.getElementById('recent-or-searched-tracks'));
    React.render(recorder, document.getElementById('recorder'));
    React.render(userTracks, document.getElementById('user-tracks'));
  }
});
