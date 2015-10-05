$(function() {
  if (typeof User !== "undefined" && User.loggedIn) {
    var organ = React.createElement(Organ, {});
    var recorder = React.createElement(Recorder, {});
    var userTracks = React.createElement(Jukebox, { role: 'user' });
    var featuredTracks = React.createElement(Jukebox, { role: 'featured' });

    React.render(organ, document.getElementById('organ'));
    React.render(recorder, document.getElementById('recorder'));
    React.render(featuredTracks, document.getElementById('featured-tracks'));
    React.render(userTracks, document.getElementById('user-tracks'));
  }
});
