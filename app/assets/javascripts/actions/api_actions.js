window.ApiActions = {
  deleteTrack: function(track) {
    $.ajax({
      url: 'api/tracks/' + track.id,
      method: 'DELETE'
    });
  },

  fetchTracks: function() {
    $.ajax({
      url: 'api/tracks',
      method: 'GET',
      success: TrackActions.parseTracksFromDB
    });
  },

  saveTrack: function(track) {
    data = { name: track.name, roll: JSON.stringify(track.frequenciesAndTimes) };

    $.ajax({
      url: 'api/tracks',
      method: 'POST',
      data: { track: data },
      success: TrackActions.updateTrack
    });
  }
}
