window.ApiActions = {
  deleteTrack: function(track) {
    $.ajax({
      url: 'api/tracks/' + track.id,
      method: 'DELETE'
    });
  },

  fetchTracks: function(role, query) {
    $.ajax({
      url: 'api/tracks/' + role,
      data: { query: query },
      success: function(data) {
        TrackActions.parseTracksFromDB(data, role);
      },
      method: (role === 'search' ? 'POST' : 'GET')
    });
  },

  saveTrack: function(track) {
    var data = { name: track.name, 
      roll: JSON.stringify(track.frequenciesAndTimes) };

    $.ajax({
      url: 'api/tracks',
      data: { track: data },
      success: TrackActions.updateTrack,
      method: 'POST'
    });
  }
}
