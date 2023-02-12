(function(ext) {
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.set_window_position = function(x, y) {
        window.moveTo(x + (screen.width / 2), y + (screen.height / 2));
    };
    
    var descriptor = {
        blocks: [
            [' ', 'set window x: %n + (screen.width / 2) y: %n + (screen.height / 2)', 'set_window_position', 0, 0]
        ],
        url: 'https://github.com/DenisKincses/scratch'
    };
    
    ScratchExtensions.register('Window position', descriptor, ext);
})({});
