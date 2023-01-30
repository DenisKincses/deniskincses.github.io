(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

// Status reporting code
// Use this to report missing hardware, plugin or unsupported browser
ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
};

// Block and block menu descriptions
var descriptor = {
    blocks: [
        [' ', 'play SoundCloud track %s', 'playSoundCloud', 'https://soundcloud.com/track', {color: 'orange'}]
    ],
    url: 'https://chat.openai.com/chat'
};

// Register the extension
ScratchExtensions.register('Sample extension', descriptor, ext);

// Block functions
ext.playSoundCloud = function(url) {
    var jqueryScript = document.createElement('script');
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    document.head.appendChild(jqueryScript);

    var soundcloudSdk = document.createElement('script');
    soundcloudSdk.src = "https://connect.soundcloud.com/sdk/sdk-3.3.2.js";
    document.head.appendChild(soundcloudSdk);

    soundcloudSdk.onload = function() {
      SC.oEmbed(url, {auto_play: true}).then(function(oEmbed) {
          var soundcloudPlayer = $('<div>').html(oEmbed.html).appendTo('body');
      });
    };
}
})({});
