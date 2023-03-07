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
            iframe.setAttribute("allow", "autoplay; controls"); // add the allow attribute
            document.body.appendChild(iframe);
            window.addEventListener('resize', updateEmbedSize); // add event listener for resize
        }
        iframe.src = url;
    };

    ext.remove_embed = function() {
        if (iframe) {
            document.body.removeChild(iframe);
            iframe = null;
            window.removeEventListener('resize', updateEmbedSize); // remove event listener when removed
        }
    };

    ext.set_embed_position = function(x, y) {
        if (iframe) {
            var stageWidth = window.innerWidth;
            var stageHeight = window.innerHeight;
            iframe.style.left = (stageWidth / 2 + x - iframe.offsetWidth / 2) + 'px';
            iframe.style.top = (stageHeight / 2 - y - iframe.offsetHeight / 2) + 'px';
        }
    };

    ext.set_embed_width_height = function(width, height) {
        if (iframe) {
            iframe.style.width = width + 'px';
            iframe.style.height = height + 'px';
            updateEmbedSize(); // call update function to resize text
        }
    };

    ext.current_url = function() {
        return iframe ? iframe.src : '';
    };

    function updateEmbedSize() {
        // get the scale factor to resize the text
        var scaleFactor = Math.min(iframe.offsetWidth / 480, iframe.offsetHeight / 360);
        // set the font size to be 60% of the scale factor times the original font size (10px)
        iframe.contentWindow.document.body.style.fontSize = scaleFactor * 6 + 'px';
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['', 'embed %s', 'embed', 'https://www.example.com'],
            ['', 'remove embed', 'remove_embed'],
            ['', 'set embed position x:%n position y:%n', 'set_embed_position', 0, 0],
            ['', 'set embed width:%n height:%n', 'set_embed_width_height', 200, 200],
            ['r', 'current url', 'current_url']
        ]
    };

    // Register the extension
    ScratchExtensions.register('Embed Extension', descriptor, ext);
})({});
