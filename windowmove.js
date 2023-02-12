(function(ext) {
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.set_window_position = function(x, y) {
        window.moveTo(x, y);
    };
    
    var descriptor = {
        blocks: [
            [' ', 'set window x: %n y: %n', 'set_window_position', 0, 0]
        ],
        url: 'http://scratch.mit.edu'
    };
    
    ScratchExtensions.register('Window position', descriptor, ext);
})({});
