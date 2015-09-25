;(function() {
  window.Track = function(options) {
    this.id = options.id || null;
    this.id && options.deletable ? this.deletable = true : this.deletable = false;
    this.name = options.name || "untitled";
    // Save only the frequency and time of each note played to the database in
    // order to avoid JSON parsing issues. When playing a track, replace each
    // frequency in this.frequenciesAndTimes with a note instantiated from that
    // frequency, and store the result in this.notesAndTimes
    this.frequenciesAndTimes = options.frequenciesAndTimes || [];
    this.recording = false;
    this.recordStartTime = null;
    this.playing = false;
  }

  Track.prototype = {

    addNotes: function(pressedKeyHash) {
      if(this.recording) {
        var frequencies = Object.keys(pressedKeyHash).map(function(pressedKey) {
          return KeyboardNotes[pressedKey];
        });
        this.recordStartTime = this.recordStartTime || Date.now();
        var time = Date.now() - this.recordStartTime;
        this.frequenciesAndTimes.push({ time: time, frequencies: frequencies });
      }
    },

    play: function() {
      this.playing = true, this.playStartTime = Date.now(), this.notesIdx = 0;
      this.notesAndTimes = this.frequenciesAndTimes.slice(0);
      this.notesAndTimes.map(function(hash) {
        hash.notes = hash.frequencies.map(function(freq) {
          return new Note(freq);
        });
        delete hash.frequencies;

        return hash;
      });
      this.interval = setInterval(this.playOrStopNotes.bind(this), 1);
    },

    playOrStopNotes: function() {
      if(this.notesAndTimes[this.notesIdx] &&
          (Date.now() - this.playStartTime) >= this.notesAndTimes[this.notesIdx].time) {
        if(this.notesIdx > 0) {
          this.notesAndTimes[this.notesIdx - 1].notes.forEach(function(note) {
            note.stop();
          });
        }

        this.notesAndTimes[this.notesIdx].notes.forEach(function(note) {
          note.start();
        }.bind(this));

        this.notesIdx++;
      }

      if(this.notesIdx === this.notesAndTimes.length) {
        this.stopPlayback();
      }
    },

    record: function() {
      this.recording = true;
    },

    stopPlayback: function() {
      clearInterval(this.interval);

      if (this.notesAndTimes[this.notesIdx - 1] &&
          this.notesAndTimes[this.notesIdx - 1].notes) {
        this.notesAndTimes[this.notesIdx - 1].notes.forEach(function(note) {
          note.stop();
        });
      }

      this.playStartTime = null, this.notesIdx = 0, this.playing = false,
      this.notesAndTimes = null;
      TrackActions.togglePlay(this);
    },

    stopRecording: function() {
      this.recording = false;
    }
  }
})();
