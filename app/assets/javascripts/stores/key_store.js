;(function(root){
  var _pressedKeys = {};

  var addKey = function(key) {
    _pressedKeys[key] = true;
  }

  var deleteKey = function(key) {
    delete _pressedKeys[key];
  }

  var CHANGE_EVENT = "change";

  root.KeyStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    pressedKeys: function(){
      // return a shallow copy so consumer cannot mutate original
      return $.extend({}, _pressedKeys);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      if (payload.actionType === KeyConstants.KEY_PRESSED) {
        addKey(payload.key);
      } else if (payload.actionType === KeyConstants.KEY_RELEASED) {
        deleteKey(payload.key);
      }

      KeyStore.emit(CHANGE_EVENT);
    })
  });

  KeyStore.setMaxListeners(Object.keys(KeyboardNotes).length + 1);
})(this);
