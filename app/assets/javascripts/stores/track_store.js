;(function(root){
  var _tracks = [];

  var addTrack = function(track) {
    _tracks.push(track);
  }

  var deleteTrack = function(track) {
    var idx = _tracks.indexOf(track);
    _tracks.splice(idx, 1);
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
      if (payload.actionType === TrackConstants.TRACK_ADDED) {
        addTrack(payload.track);
        TrackStore.emit(CHANGE_EVENT);
      } else if (payload.actionType === TrackConstants.TRACK_DELETED) {
        deleteTrack(payload.track);
        TrackStore.emit(CHANGE_EVENT);
      } else if (payload.actionType === TrackConstants.TRACK_PLAYBACK_TOGGLED) {
        TrackStore.emit(CHANGE_EVENT);
      }
    })
  });
})(this);
