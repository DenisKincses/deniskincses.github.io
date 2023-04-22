(function(ext) {
  // Define constants
  var STATUS_STOPPED = 0;
  var STATUS_PLAYING = 1;
  var STATUS_PAUSED = 2;
  
  // Initialize variables
  var midiPlayer = null;
  var midiFile = null;
  var midiStatus = STATUS_STOPPED;
  var midiCurrentTime = 0;
  var midiTotalTime = 0;
  
  // Define block functions
  ext.playMidi = function(url) {
    // Stop any currently playing MIDI
    if (midiPlayer !== null) {
      ext.stopMidi();
    }
    
    // Load the MIDI file
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => {
        midiFile = new MidiFile(data);
        midiPlayer = new MidiPlayer.Player(function(event, index) {
          if (event.name === 'Note on') {
            // Do something when a note is played
          }
        });
        midiPlayer.loadArrayBuffer(data);
        midiStatus = STATUS_PLAYING;
        midiCurrentTime = 0;
        midiTotalTime = midiPlayer.endTime;
        midiPlayer.play();
      })
      .catch(error => console.log(error));
  };
  
  ext.pauseMidi = function() {
    if (midiStatus === STATUS_PLAYING) {
      midiPlayer.pause();
      midiStatus = STATUS_PAUSED;
      midiCurrentTime = midiPlayer.currentTime;
    }
  };
  
  ext.resumeMidi = function() {
    if (midiStatus === STATUS_PAUSED) {
      midiPlayer.play();
      midiStatus = STATUS_PLAYING;
    }
  };
  
  ext.stopMidi = function() {
    if (midiPlayer !== null) {
      midiPlayer.stop();
      midiStatus = STATUS_STOPPED;
      midiCurrentTime = 0;
      midiTotalTime = 0;
      midiPlayer = null;
      midiFile = null;
    }
  };
  
  ext.getMidiName = function() {
    if (midiFile !== null) {
      return midiFile.name;
    }
    return '';
  };
  
  ext.getMidiArtist = function() {
    if (midiFile !== null) {
      return midiFile.artist;
    }
    return '';
  };
  
  ext.getMidiDuration = function() {
    return midiTotalTime;
  };
  
  ext.getMidiCurrentTime = function() {
    if (midiStatus === STATUS_PLAYING) {
      return midiPlayer.currentTime;
    }
    return midiCurrentTime;
  };
  
  // Define block metadata
  var descriptor = {
    blocks: [
      [' ', 'play MIDI from URL %s', 'playMidi', ' '],
      [' ', 'pause MIDI', 'pauseMidi'],
      [' ', 'resume MIDI', 'resumeMidi'],
      [' ', 'stop MIDI', 'stopMidi'],
      ['r', 'MIDI name', 'getMidiName'],
      ['r', 'MIDI artist','getMidiArtist'],
      ['r', 'MIDI duration', 'getMidiDuration'],
      ['r', 'MIDI current time', 'getMidiCurrentTime']
],
menus: {},
url: 'https://deniskincses.github.io/deniskincses/'
};

// Register the extension
ScratchExtensions.register('MIDI', descriptor, ext);
})({});
