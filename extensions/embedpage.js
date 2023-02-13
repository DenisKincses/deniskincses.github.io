(function(ext) {
var stageWidth, stageHeight;
var iframe;
var container;

ext.embed_webpage = function(url) {
if (!iframe) {
container = document.createElement('div');
container.style.position = 'relative';
document.body.appendChild(container);

    iframe = document.createElement('iframe');
    container.appendChild(iframe);
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
if (!iframe) {
return;
}
iframe.style.left = x + 'px';
iframe.style.top = y + 'px';
};

ext.set_webpage_dimensions = function(width, height) {
if (!iframe) {
return;
}
iframe.style.width = width + 'px';
iframe.style.height = height + 'px';
};

ext.remove_webpage = function() {
if (iframe) {
document.body.removeChild(container);
iframe = null;
container = null;
}
};

var descriptor = {
blocks: [
[' ', 'embed webpage %s', 'embed_webpage', 'https://www.example.com'],
[' ', 'set webpage position x: %n y: %n', 'set_webpage_position', 0, 0],
[' ', 'set webpage size width: %n height: %n', 'set_webpage_dimensions', 480, 360],
[' ', 'remove webpage', 'remove_webpage']
],
url: 'https://deniskincses.github.io/'
};

ScratchExtensions.register('Embed Page', descriptor, ext);
})({});
