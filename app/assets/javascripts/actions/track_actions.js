window.TrackActions = {

  addTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_ADDED,
      track: track
    })
  },

  deleteTrack: function(track) {
    track['delete'] = true;
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_DELETED,
      track: track
    })
  },

  togglePlay: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_PLAYBACK_TOGGLED,
      track: track
    })
  }
}
