(function(ext) {
var stageWidth, stageHeight;
var iframe;

ext.embed_webpage = function(url) {
    if (!iframe) {
        iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.style.position = 'absolute';
    }
    
    stageWidth = window.innerWidth;
    stageHeight = window.innerHeight;
    var offsetX = stageWidth / 2;
    var offsetY = stageHeight / 2;
    
    iframe.style.width = stageWidth + 'px';
    iframe.style.height = stageHeight + 'px';
    iframe.style.left = offsetX + 'px';
    iframe.style.top = offsetY + 'px';
    iframe.src = url;
};

ext.set_webpage_position = function(x, y) {
    iframe.style.left = x + offsetX + 'px';
    iframe.style.top = (-1 * y) + offsetY + 'px';
};

ext.set_webpage_dimensions = function(width, height) {
    iframe.style.width = width + 'px';
    iframe.style.height = height + 'px';
};

    var descriptor = {
        blocks: [
            [' ', 'embed webpage %s', 'embed_webpage', 'https://www.example.com'],
            [' ', 'set webpage position x: %n y: %n', 'set_webpage_position', 0, 0],
            [' ', 'set webpage size width: %n height: %n', 'set_webpage_size', 480, 360]
        ],
        url: 'https://deniskincses.github.io/'
    };

    ScratchExtensions.register('Embed Page', descriptor, ext);
})({});
