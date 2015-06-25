;(function() {
  window.Track = function(name, roll) {
    this.name = name || "untitled";
    this.roll = roll || [];
    this.recording = false;
    this.playing = false;
  }

  Track.prototype = {

    addNotes: function(noteHash) {
      var notes = Object.keys(noteHash).map(function(noteName) {
        return new Note(KeyboardNotes[noteName]);
      });

      if(this.recording) {
        this.recordStartTime = this.recordStartTime || Date.now();
        var time = Date.now() - this.recordStartTime;
        this.roll.push({ time: time, notes: notes });
      }
    },

    play: function() {
      this.playing = true;
      this.playStartTime = Date.now();
      this.playingNotes = [];
      this.player = this.roll.slice(0);
      this.interval = setInterval(this.playOrStopNotes.bind(this), 1);
    },

    playOrStopNotes: function() {
      if(this.player[0] &&
          (Date.now() - this.playStartTime) >= this.player[0].time) {
        this.playingNotes.forEach(function(note) {
          note.stop();
        });

        this.playingNotes = [];
        this.player[0].notes.forEach(function(note) {
          note.start();
          this.playingNotes.push(note);
        }.bind(this));
        this.player.shift();
      }

      if(this.player.length === 0) {
        this.stopPlayback();
      }
    },

    record: function() {
      this.recordStartTime = null;
      this.recording = true;
    },

    stopPlayback: function() {
      clearInterval(this.interval);
      this.playingNotes.forEach(function(note) {
        note.stop();
      });
      this.playingNotes = [];
      this.playing = false;
    },

    stopRecording: function() {
      this.recording = false;
      this.recordStartTime = null;
    }
  }
})();
