$(function() {
  var organ = React.createElement(Organ, {});
  var recorder = React.createElement(Recorder, {});
  var jukebox = React.createElement(Jukebox, {});
  if (typeof User !== "undefined" && User.loggedIn) {
    React.render(organ, document.getElementById('organ'));
    React.render(recorder, document.getElementById('recorder'));
    React.render(jukebox, document.getElementById('jukebox'));
  }
});
