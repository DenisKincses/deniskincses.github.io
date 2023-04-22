// Load the MidiPlayer.js library
var script = document.createElement('script');
script.src = 'path/to/MidiPlayer.js'; // Replace 'path/to' with the actual path to the MidiPlayer.js file
script.onload = function () {
  // Your code using the MidiPlayer.js library goes here

  // Constants:
  var MIDI_FILE_LOADED_EVENT = 'midifileloaded';

  // Variables:
  var player = null;
  var midiFileUrl = null;
  var midiFileMetadata = null;

  // Functions:
  function loadMidiFile(url) {
      player = new MidiPlayer.Player(function (event) {
          if (event.name == 'noteOn') {
              ext.trigger({type: 'noteOn', pitch: event.noteNumber, velocity: event.velocity});
          } else if (event.name == 'noteOff') {
              ext.trigger({type: 'noteOff', pitch: event.noteNumber, velocity: event.velocity});
          }
      });

      midiFileUrl = url;
      player.loadFile(midiFileUrl, function () {
          midiFileMetadata = {
              duration: player.endTime,
              bpm: player.tempo,
              tracks: player.tracks.length
          };
          ext.trigger(MIDI_FILE_LOADED_EVENT);
      });
  }

  function playMidiFile() {
      if (player) {
          player.play();
      }
  }

  function pauseMidiFile() {
      if (player) {
          player.pause();
      }
  }

  function stopMidiFile() {
      if (player) {
          player.stop();
      }
  }

  // Extension API:
  ext.playMidiFile = function () {
      playMidiFile();
  };

  ext.pauseMidiFile = function () {
      pauseMidiFile();
  };

  ext.stopMidiFile = function () {
      stopMidiFile();
  };

  ext.loadMidiFileFromUrl = function (url) {
      loadMidiFile(url);
  };

  ext.getMidiFileDuration = function () {
      return midiFileMetadata ? midiFileMetadata.duration : null;
  };

  ext.getMidiFileBpm = function () {
      return midiFileMetadata ? midiFileMetadata.bpm : null;
  };

  ext.getMidiFileTracksCount = function () {
      return midiFileMetadata ? midiFileMetadata.tracks : null;
  };

  // Block and menu descriptions:
  var descriptor = {
      blocks: [
          [' ', 'Load MIDI file from URL %s', 'loadMidiFileFromUrl', ''],
          [' ', 'Play MIDI file', 'playMidiFile'],
          [' ', 'Pause MIDI file', 'pauseMidiFile'],
          [' ', 'Stop MIDI file', 'stopMidiFile'],
          ['r', 'MIDI file duration', 'getMidiFileDuration'],
          ['r', 'MIDI file BPM', 'getMidiFileBpm'],
          ['r', 'MIDI file tracks count', 'getMidiFileTracksCount']
      ],
      menus: {}
  };

  // Register the extension:
  ScratchExtensions.register('MIDI file player', descriptor, ext);

};
document.head.appendChild(script);
