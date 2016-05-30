window.ApiActions = {
  deleteTrack: function(track) {
    $.ajax({
      url: 'api/tracks/' + track.id,
      method: 'DELETE'
    });
  },

  fetchRecentTracks: function() {
    $.ajax({
      url: 'api/tracks/recent',
      success: TrackActions.parseRecentTracksFromDB,
      method: 'GET'
    });
  },

  saveTrack: function(track) {
    data = { name: track.name, roll: JSON.stringify(track.frequenciesAndTimes) };

    $.ajax({
      url: 'api/tracks',
      data: { track: data },
      success: TrackActions.updateTrack,
      method: 'POST'
    });
  }
}
