(function (ext) {
    // Variables to keep track of the mouse position
    var mouseX = 0;
    var mouseY = 0;

    // Function to move the mouse to a specific position
    function moveMouse(x, y) {
        mouseX = x;
        mouseY = y;
        var event = new MouseEvent('mousemove', {
            'view': window,
            'bubbles': true,
            'cancelable': true,
            'clientX': mouseX,
            'clientY': mouseY
        });
        document.dispatchEvent(event);
    }

    // Block to set the mouse position
    ext.setMousePosition = function (x, y) {
        moveMouse(x, y);
    };

    // Block to move the mouse relative to its current position
    ext.moveMouseBy = function (x, y) {
        moveMouse(mouseX + x, mouseY + y);
    };

    // Block to get the current x position of the mouse
    ext.getMouseX = function () {
        return mouseX;
    };

    // Block to get the current y position of the mouse
    ext.getMouseY = function () {
        return mouseY;
    };

    // Block and descriptor for Scratch
    var descriptor = {
        blocks: [
            [' ', 'set mouse position to x:%n y:%n', 'setMousePosition', 0, 0],
            [' ', 'move mouse by x:%n y:%n', 'moveMouseBy', 0, 0],
            ['r', 'mouse x', 'getMouseX'],
            ['r', 'mouse y', 'getMouseY'],
        ]
    };

    // Register the extension with Scratch
    ScratchExtensions.register('Mouse control', descriptor, ext);
})({});
