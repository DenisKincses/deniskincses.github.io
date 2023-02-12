// Scratch Extension for opening new tabs
(function(ext) {
// Cleanup function when the extension is unloaded
ext._shutdown = function() {};
// Status reporting code
// Use this to report missing hardware, plugin or unsupported browser
ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
};

ext.open_tab = function(url) {
    // Opens a new tab with the given URL
    window.open(url, "_blank");
};

// Block and block menu descriptions
var descriptor = {
    blocks: [
        [' ', 'open tab with URL %s', 'open_tab', 'https://www.google.com']
    ],
    url: 'http://www.example.com/ScratchExtensions/open_tab'
};

// Register the extension
ScratchExtensions.register('Open Tab Extension', descriptor, ext);
})({});
