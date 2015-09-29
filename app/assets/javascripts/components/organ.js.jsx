var Organ = React.createClass({

  render: function() {
    var keyNames = [];
    for (var keyName in KeyboardNotes) {
      keyNames.push(keyName);
    }

    var keys = [];

    keyNames.forEach(function(keyName, idx) {
      if (KeyColors[keyName] === 'black') {
        if (idx < 4) {
          var leftPos = (52 * (idx + 1) / 2) - 15;
        } else if (idx < 11){
          var leftPos = (52 * (idx + 2) / 2) - 22.5;
        } else var leftPos = (52 * (idx + 3) / 2) - 30;

        keys.push(<Key key={ idx } keyName={ keyName }
        color={ KeyColors[keyName] } style={{ left : leftPos }} />);
      } else {
        keys.push(<Key key={ idx } keyName={ keyName }
        color={ KeyColors[keyName] } />);
      }
    });

    return (
      <div className='organ-container'>
        <div className='organ-inner-container'>
          <div className='organ'>
            { keys }
          </div>
        </div>
      </div>
    )
  }
});
