window.KeyColors = {
  'a': 'white',
  'w': 'black',
  's': 'white',
  'e': 'black',
  'd': 'white',
  'f': 'white',
  't': 'black',
  'g': 'white',
  'y': 'black',
  'h': 'white',
  'u': 'black',
  'j': 'white',
  'k': 'white'
};

var Organ = React.createClass({

  render: function() {
    var noteNames = [];
    for (var notename in KeyboardNotes) {
      noteNames.push(notename);
    }

    var keys = [];

    noteNames.forEach(function(noteName, idx) {
      if (KeyColors[noteName] === 'black') {
        if (idx < 4) {
          var leftPos = (52 * (idx + 1) / 2) - 15;
        } else {
          var leftPos = (52 * (idx + 2) / 2) - 22.5;
        }

        keys.push(<Key key={ idx } noteName={ noteName }
        color={ KeyColors[noteName] } style={{ left : leftPos }} />);
      } else {
        keys.push(<Key key={ idx } noteName={ noteName }
        color={ KeyColors[noteName] } />);
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
