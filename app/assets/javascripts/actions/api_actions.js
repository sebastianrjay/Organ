window.ApiActions = {
  deleteTrack: function(track) {
    $.ajax({
      url: 'api/tracks/' + track.id,
      method: 'DELETE'
    });
  },

  saveTrack: function(track) {
    data = { name: track.name , roll: JSON.stringify(track.roll) };

    $.ajax({
      url: 'api/tracks',
      method: 'POST',
      data: { track: data },
      success: TrackActions.updateTrack
    });
  }
}
