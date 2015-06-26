window.ApiActions = {
  deleteTrack: function(track) {
    // need to get track ID
  },

  saveTrack: function(track) {
    data = { name: track.name , roll: JSON.stringify(track.roll) };

    $.ajax({
      url: 'api/tracks',
      method: 'POST',
      data: { track: data }
    });
  }
}
