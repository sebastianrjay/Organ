;(function(root){
  var _featuredTracks = [], _userTracks = [];

  var addFeaturedTrack = function(track) {
    track.role = 'featured';
    _featuredTracks.push(track);
  }

  var addUserTrack = function(track) {
    track.role = 'user';
    _userTracks.push(track);
  }

  var deleteTrack = function(track) {
    var tracksArr = (track.role === 'user') ? _userTracks : _featuredTracks;
    var idx = tracksArr.indexOf(track);
    tracksArr.splice(idx, 1);
  }

  var parseAndAddTracksFromDB = function(data, tracksAreFeatured) {
    var addFn = tracksAreFeatured ? addFeaturedTrack : addUserTrack;
    data.forEach(function(trackData) {
      addFn(new Track({ name: trackData.name, id: trackData.id,
        frequenciesAndTimes: trackData.roll, deletable: trackData.deletable,
        composer: (trackData.composer || {}).username
      }));
    });
  }

  var updateTrack = function(newData) {
    var tracksRequiringUpdate = _userTracks.concat(_featuredTracks)
      .filter(function(track) {
        return newData.name === track.name;
      });
    if (newData.composer){ newData.composer = newData.composer.username; }
    // Don't redundantly include newData.roll, which is identical to
    // track.frequenciesAndTimes
    delete newData.roll;

    tracksRequiringUpdate.forEach(function(track){
      $.extend(track, newData);
    });
  }

  var CHANGE_EVENT = "change";

  root.TrackStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    featuredTracks: function() {
      return _featuredTracks.slice(0);
    },

    userTracks: function() {
      return _userTracks.slice(0);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch(payload.actionType) {
        case TrackConstants.USER_TRACK_ADDED:
          addUserTrack(payload.track);
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
        case TrackConstants.FEATURED_TRACKS_FETCHED:
          parseAndAddTracksFromDB(payload.data, true);
          TrackStore.emit(CHANGE_EVENT);
          break;
      }

      return true;
    })
  });
})(this);


$(function(){
  if(User.loggedIn) {
    ApiActions.fetchFeaturedTracks();
  }
});
