(function(ext) {
    var iframe;

    ext._shutdown = function() {};
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.embed_webpage = function(url) {
        iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.style.margin = '0';
        iframe.style.padding = '0';
        iframe.style.overflow = 'hidden';
        iframe.style.position = 'absolute';
        document.body.appendChild(iframe);
    };

    ext.set_webpage_position = function(x, y) {
        iframe.style.left = x + 'px';
        iframe.style.top = (-1 * y) + 'px';
    };

    ext.set_webpage_size = function(width, height) {
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
