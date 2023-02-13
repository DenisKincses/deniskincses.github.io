(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    var iframe;

    ext.embed = function(url) {
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            document.body.appendChild(iframe);
        }
        iframe.src = url;
    };

    ext.remove_embed = function() {
        if (iframe) {
            document.body.removeChild(iframe);
            iframe = null;
        }
    };

    ext.set_embed_position = function(x, y) {
        if (iframe) {
            var stageWidth = 480;
            var stageHeight = 360;
            iframe.style.left = (stageWidth / 2 + x + iframe.offsetWidth / 2) + 'px';
            iframe.style.top = (stageHeight / 2 - y + iframe.offsetHeight / 2) + 'px';
        }
    };

    ext.set_embed_width_height = function(width, height) {
        if (iframe) {
            iframe.style.width = width + 'px';
            iframe.style.height = height + 'px';
        }
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'embed %s', 'embed', 'https://www.example.com'],
            ['', 'remove embed', 'remove_embed'],
            ['', 'set embed position x:%n position y:%n', 'set_embed_position', 0, 0],
            ['', 'set embed width:%n height:%n', 'set_embed_width_height', 200, 200]
        ]
    };

    // Register the extension
    ScratchExtensions.register('Embed Extension', descriptor, ext);
})({});
