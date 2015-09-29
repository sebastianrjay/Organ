var handleKeyInput = function(e, actionType){
  e.preventDefault();
  var keyName = String.fromCharCode(e.keyCode).toLowerCase();
  if (KeyboardNotes[keyName]) {
    AppDispatcher.dispatch({
      actionType: actionType,
      key: keyName
    });
  }
}

window.KeyActions = {

  handleMouseInput: function(keyName, actionType) {
    AppDispatcher.dispatch({
      actionType: actionType,
      key: keyName
    });
  },

  pressKey: function(e) {
    handleKeyInput(e, KeyConstants.KEY_PRESSED);
  },

  releaseKey: function(e) {
    handleKeyInput(e, KeyConstants.KEY_RELEASED);
  }
}
