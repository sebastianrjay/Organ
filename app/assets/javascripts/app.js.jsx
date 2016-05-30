$(function() {
  if (typeof User !== "undefined" && User.loggedIn) {
    var organ = React.createElement(Organ, {});
    var recorder = React.createElement(Recorder, {});
    var userTracks = React.createElement(Jukebox, { role: 'user' });
    var recentTracks = React.createElement(Jukebox, { role: 'recent' });

    React.render(organ, document.getElementById('organ'));
    React.render(recorder, document.getElementById('recorder'));
    React.render(recentTracks, document.getElementById('recent-tracks'));
    React.render(userTracks, document.getElementById('user-tracks'));
  }
});
