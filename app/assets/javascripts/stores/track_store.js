;(function(root){
  var _tracks = [];

  var addTrack = function(track) {
    _tracks.push(track);
  }

  var deleteTrack = function(track) {
    var idx = _tracks.indexOf(track);
    _tracks.splice(idx, 1);
  }

  var parseAndAddTracksFromDB = function(data) {
    data.forEach(function(trackData) {
      addTrack(new Track({ name: trackData.name, id: trackData.id,
        frequenciesAndTimes: trackData.roll, deletable: trackData.deletable,
        composer: trackData.composer.username
      }));
    });
  }

  var updateTrack = function(newData) {
    var trackRequiringUpdate = _tracks.filter(function(track) {
      return newData.name === track.name;
    })[0] || {};
    if (newData.composer){ newData.composer = newData.composer.username; }
    // Don't redundantly include newData.roll, which is identical to
    // track.frequenciesAndTimes
    delete newData.roll;

    debugger
    $.extend(trackRequiringUpdate, newData);
  }

  var CHANGE_EVENT = "change";

  root.TrackStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    tracks: function(){
      return _tracks.slice(0);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case TrackConstants.TRACK_ADDED:
          addTrack(payload.track);
          TrackStore.emit(CHANGE_EVENT);
          break;
        case TrackConstants.TRACK_DELETED:
          deleteTrack(payload.track);
          TrackStore.emit(CHANGE_EVENT);
          break;
        case TrackConstants.TRACK_PLAYBACK_TOGGLED:
          TrackStore.emit(CHANGE_EVENT);
          break;
        case TrackConstants.TRACK_UPDATED:
          updateTrack(payload.newData);
          TrackStore.emit(CHANGE_EVENT);
          break;
        case TrackConstants.TRACKS_FETCHED:
          parseAndAddTracksFromDB(payload.data);
          TrackStore.emit(CHANGE_EVENT);
          break;
      }

      return true;
    })
  });
})(this);

ApiActions.fetchTracks();
