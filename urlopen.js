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
        [' ', 'open tab with url %s', 'open_tab', 'https://www.google.com']
    ],
    url: 'https://deniskincses.github.io'
};
ScratchExtensions.register('Open Tab', descriptor, ext);
})({});
