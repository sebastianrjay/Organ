;(function() {
  window.Track = function(name, roll) {
    this.name = name || "untitled";
    this.roll = roll || [];
    this.recording = false;
    this.recordStartTime = null;
    this.playing = false;
  }

  Track.prototype = {

    addNotes: function(noteHash) {
      if(this.recording) {
        var notes = Object.keys(noteHash).map(function(noteName) {
          return new Note(KeyboardNotes[noteName]);
        });
        this.recordStartTime = this.recordStartTime || Date.now();
        var time = Date.now() - this.recordStartTime;
        this.roll.push({ time: time, notes: notes });
      }
    },

    play: function() {
      this.playing = true, this.playStartTime = Date.now(), this.rollIdx = 0;
      this.interval = setInterval(this.playOrStopNotes.bind(this), 1);
    },

    playOrStopNotes: function() {
      if(this.roll[this.rollIdx] &&
          (Date.now() - this.playStartTime) >= this.roll[this.rollIdx].time) {
        if(this.rollIdx > 0) {
          this.roll[this.rollIdx - 1].notes.forEach(function(note) {
            note.stop();
          });
        }

        this.roll[this.rollIdx].notes.forEach(function(note) {
          note.start();
        }.bind(this));

        this.rollIdx++;
      }

      if(this.rollIdx === this.roll.length) {
        this.stopPlayback();
      }
    },

    record: function() {
      this.recording = true;
    },

    stopPlayback: function() {
      clearInterval(this.interval);

      if (this.roll[this.rollIdx - 1] && this.roll[this.rollIdx - 1].notes) {
        this.roll[this.rollIdx - 1].notes.forEach(function(note) {
          note.stop();
        });
      }

      this.playStartTime = null, this.rollIdx = 0, this.playing = false;
      TrackActions.togglePlay(this);
    },

    stopRecording: function() {
      this.recording = false;
    }
  }
})();
