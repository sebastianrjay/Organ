window.KeyActions = {

  handleMousePress: function(noteName) {
    AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_PRESSED,
      key: noteName
    });
  },

  handleMouseUp: function(noteName) {
    AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_RELEASED,
      key: noteName
    });
  },

  pressKey: function(e) {
    e.preventDefault();
    var keyName = String.fromCharCode(e.keyCode).toLowerCase();
    if (KeyboardNotes[keyName]) {
      AppDispatcher.dispatch({
        actionType: KeyConstants.KEY_PRESSED,
        key: keyName
      });
    }
  },

  releaseKey: function(e) {
    e.preventDefault();
    var keyName = String.fromCharCode(e.keyCode).toLowerCase();
    if (KeyboardNotes[keyName]) {
      AppDispatcher.dispatch({
        actionType: KeyConstants.KEY_RELEASED,
        key: keyName
      });
    }
  }
}
