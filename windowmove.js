(function(ext) {
    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    ext.set_window_position = function(x, y) {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var screenWidth = screen.width;
        var screenHeight = screen.height;
        window.moveTo(x + (screenWidth - windowWidth) / 2, -y + (screenHeight - windowHeight) / 2);
    };
    
    var descriptor = {
        blocks: [
            [' ', 'set window x: %n y: %n', 'set_window_position', 0, 0]
        ],
        url: 'https://deniskincses.github.io/'
    };
    
    ScratchExtensions.register('Window position', descriptor, ext);
})({});
