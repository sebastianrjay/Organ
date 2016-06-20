;(function(root){
  var _trackStores = { recent: [], search: [], user: [] };

  var addTrack = function(track, role) {
    _trackStores[role].push(track);
  };

  var allTracks = function() {
    return Object.keys(_trackStores)
      .map(function(trackType) { return _trackStores[trackType]; })
      .reduce(function(allTracks, tracks) { return allTracks.concat(tracks); });
  };

  var deleteTrack = function(track, role) {
    var idx = _trackStores[role].indexOf(track);
    _trackStores[role].splice(idx, 1);
  };

  var parseAndAddTracksFromDB = function(data, role) {
    _trackStores[role] = [];

    data.forEach(function(trackData) {
      var newTrack = new Track({
        name: trackData.name,
        id: trackData.id,
        frequenciesAndTimes: trackData.roll,
        deletable: trackData.deletable,
        composer: (trackData.composer || {}).username
      });
      
      addTrack(newTrack, role);
    });
  };

  var updateTrack = function(newData) {
    var tracksRequiringUpdate = allTracks().filter(function(track) {
      return newData.name === track.name;
    });

    if(newData.composer) { newData.composer = newData.composer.username; }
    // Don't redundantly include newData.roll, which is identical to
    // track.frequenciesAndTimes and never changes
    delete newData.roll;

    tracksRequiringUpdate.forEach(function(track){
      $.extend(track, newData);
    });
  };

  var CHANGE_EVENT = "change";

  root.TrackStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    tracks: function(trackType) {
      return _trackStores[trackType].slice(0);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case TrackConstants.USER_TRACK_ADDED:
          addTrack(payload.track, 'user');
          break;
        case TrackConstants.TRACK_DELETED:
          deleteTrack(payload.track, payload.role);
          break;
        case TrackConstants.TRACK_PLAYBACK_TOGGLED:
          break;
        case TrackConstants.TRACK_UPDATED:
          updateTrack(payload.newData);
          break;
        case TrackConstants.RECENT_TRACKS_FETCHED:
        case TrackConstants.SEARCH_TRACKS_FETCHED:
          parseAndAddTracksFromDB(payload.data, 
            payload.actionType.slice(0, 6).toLowerCase());
          break;
      }

      TrackStore.emit(CHANGE_EVENT);
    })
  });
})(this);


$(function(){
  if(User.loggedIn) {
    ApiActions.fetchTracks('recent');
  }
});
