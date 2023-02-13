(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.make_borderless = function() {
        var el = document.documentElement;
        el.style.setProperty('--window-border', '0px');
    };

    ext.make_transparent = function() {
        var el = document.documentElement;
        el.style.setProperty('background-color', 'transparent');
        el.style.setProperty('background', 'none');
    };

    ext.reset_effects = function() {
        var el = document.documentElement;
        el.style.removeProperty('--window-border');
        el.style.removeProperty('background-color');
        el.style.removeProperty('background');
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [' ', 'make window borderless', 'make_borderless'],
            [' ', 'make window transparent', 'make_transparent'],
            [' ', 'reset window effects', 'reset_effects'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Window Effects Extension', descriptor, ext);
})({});

