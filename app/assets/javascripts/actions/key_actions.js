var handleKeyInput = function(event, actionType){
  event.preventDefault();
  var keyName = String.fromCharCode(event.keyCode).toLowerCase();

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

  pressKey: function(event) {
    handleKeyInput(event, KeyConstants.KEY_PRESSED);
  },

  releaseKey: function(event) {
    handleKeyInput(event, KeyConstants.KEY_RELEASED);
  }
}
