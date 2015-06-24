window.TrackActions = {

  addTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_ADDED,
      track: track
    })
  },

  deleteTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_DELETED,
      track: track
    })
  }
}
