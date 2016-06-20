window.TrackActions = {

  addUserTrack: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.USER_TRACK_ADDED,
      track: track
    });
  },

  deleteTrack: function(track, role) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_DELETED,
      track: track,
      role: role
    });
  },

  parseTracksFromDB: function(data, role) {
    var actionTypes = { 
      recent: TrackConstants.RECENT_TRACKS_FETCHED,
      search: TrackConstants.SEARCH_TRACKS_FETCHED
    };
    
    AppDispatcher.dispatch({
      actionType: actionTypes[role],
      data: data
    });
  },

  updateTrack: function(newData) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_UPDATED,
      newData: newData
    });
  },

  togglePlay: function(track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_PLAYBACK_TOGGLED,
      track: track
    });
  }
};
