(function(ext) {

    // Define the function that will be called when the block is run
    ext.setTransparency = function(transparency) {
        if (transparency < 0) {
            transparency = 0;
        }
        if (transparency > 100) {
            transparency = 100;
        }
        var stage = document.getElementById('stage');
        stage.style.opacity = (100 - transparency) / 100;
    };

    // Define the extension's blocks, menus, and other properties
    var descriptor = {
        blocks: [
            [' ', 'set backdrop transparency to %n', 'setTransparency', 50],
        ],
    };

    // Register the extension
    ScratchExtensions.register('Backdrop Transparency', descriptor, ext);

})({});
