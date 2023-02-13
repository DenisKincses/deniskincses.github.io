(function(ext) {
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.set_window_position = function(x, y, callback) {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var screenWidth = screen.width;
        var screenHeight = screen.height;
        window.moveTo(x + (screenWidth - windowWidth) / 2, -y + (screenHeight - windowHeight) / 2);
        setTimeout(function() {
            callback();
        }, 0);
    };
    
    var descriptor = {
        blocks: [
            ['w', 'set window x: %n y: %n', 'set_window_position', 0, 0, 'wait']
        ],
        url: 'http://scratch.mit.edu'
    };
    
    ScratchExtensions.register('Window position', descriptor, ext);
})({});
