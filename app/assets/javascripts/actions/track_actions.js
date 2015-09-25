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
  },

  parseTracksFromDB: function(data) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACKS_FETCHED,
      data: data
    })
  },

  updateTrack: function(newData) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_UPDATED,
      newData: newData
    })
  },

  togglePlay: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_PLAYBACK_TOGGLED,
      track: track
    })
  }
}
