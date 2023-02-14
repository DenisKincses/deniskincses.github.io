(function(ext) {
    ext.shutdown_computer = function() {
        // Send a command to shut down the computer
        require('child_process').exec('shutdown -s -t 0');
    };
    
    ext.restart_computer = function() {
        // Send a command to restart the computer
        require('child_process').exec('shutdown -r -t 0');
    };
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {
        // Nothing to do
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'Shut down computer', 'shutdown_computer'],
            [' ', 'Restart computer', 'restart_computer'],
        ],
        menus: {},
    };

    // Register the extension
    ScratchExtensions.register('Computer Control', descriptor, ext);
})({});
