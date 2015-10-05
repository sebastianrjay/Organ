window.TrackActions = {

  addUserTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.USER_TRACK_ADDED,
      track: track
    })
  },

  deleteTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_DELETED,
      track: track
    })
  },

  parseFeaturedTracksFromDB: function(data) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.FEATURED_TRACKS_FETCHED,
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
