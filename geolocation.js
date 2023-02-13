(function (ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function () {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function () {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_latitude = function (callback) {
        navigator.geolocation.getCurrentPosition(function (position) {
            callback(position.coords.latitude);
        });
    };

    ext.get_longitude = function (callback) {
        navigator.geolocation.getCurrentPosition(function (position) {
            callback(position.coords.longitude);
        });
    };

    // Register the extension
    var descriptor = {
        blocks: [
            ['R', 'user\'s latitude', 'get_latitude'],
            ['R', 'user\'s longitude', 'get_longitude']
        ],
        url: 'deniskincses.github.io/scratch'
    };

    ScratchExtensions.register('Geolocation API', descriptor, ext);
})({});
