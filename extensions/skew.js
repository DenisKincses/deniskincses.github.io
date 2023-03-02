(function(ext) {

    // define skew block
    ext.skew = function(spriteIndex, skewX, skewY) {
        var sprite = Scratch.sprite[spriteIndex];
        sprite.scratchSkewX = skewX;
        sprite.scratchSkewY = skewY;
        sprite.draw();
    };

    // block and descriptor definitions
    var descriptor = {
        blocks: [
            [' ', 'skew sprite %n by x:%n y:%n', 'skew', 1, 0, 0]
        ]
    };

    // register the extension
    ScratchExtensions.register('Skew extension', descriptor, ext);

})({});
