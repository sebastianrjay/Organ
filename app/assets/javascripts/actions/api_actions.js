window.ApiActions = {
  deleteTrack: function(track) {
    data = { name: track.name , delete: true, roll: JSON.stringify(track.roll) };

    $.ajax({
      url: 'api/tracks',
      method: 'POST',
      data: { track: data }
    });
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
