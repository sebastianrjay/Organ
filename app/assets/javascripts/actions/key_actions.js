window.KeyActions = {

  handleMousePress: function(noteName) {
    AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_PRESSED,
      key: noteName
    })
  },

  handleMouseUp: function(noteName) {
    AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_RELEASED,
      key: noteName
    })
  },

  pressKey: function(e) {
    e.preventDefault();
    AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_PRESSED,
      key: String.fromCharCode(e.keyCode).toLowerCase()
    })
  },

  releaseKey: function(e) {
    e.preventDefault();
    AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_RELEASED,
      key: String.fromCharCode(e.keyCode).toLowerCase()
    })
  }
}
