(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Function to make the backdrop transparent
    ext.make_backdrop_transparent = function() {
        var stage = document.getElementById('stage');
        if (stage) {
            stage.style.background = 'none';
        }
    };

    // Function to make the frame disappear
    ext.make_frame_disappear = function() {
        var blocks = document.getElementsByClassName('blocklyMainBackground');
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].style.display = 'none';
        }
    };

    // Function to remove effects
    ext.remove_effects = function() {
        var stage = document.getElementById('stage');
        if (stage) {
            stage.style.filter = '';
        }
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'make backdrop transparent', 'make_backdrop_transparent'],
            ['', 'make frame disappear', 'make_frame_disappear'],
            ['', 'remove effects', 'remove_effects']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Window Effects', descriptor, ext);
})({});
