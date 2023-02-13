(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Function to get the browser name and version
    ext.getBrowser = function(callback) {
        var browser = '';
        var version = '';

        // Check for browsers
        if (navigator.userAgent.indexOf('Chrome') !== -1) {
            browser = 'Chrome';
            version = navigator.userAgent.match(/Chrome\/(\d+)\./)[1];
        } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
            browser = 'Firefox';
            version = navigator.userAgent.match(/Firefox\/(\d+)\./)[1];
        } else if (navigator.userAgent.indexOf('Safari') !== -1) {
            browser = 'Safari';
            version = navigator.userAgent.match(/Version\/(\d+)\.(\d+)\.(\d+) Safari/)[1];
        } else if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident') !== -1) {
            browser = 'Internet Explorer';
            version = navigator.userAgent.match(/MSIE (\d+\.\d+);/)[1];
        } else if (navigator.userAgent.indexOf('Edge') !== -1) {
            browser = 'Microsoft Edge';
            version = navigator.userAgent.match(/Edge\/(\d+)\.(\d+)\.(\d+)/)[1];
        }

        // Callback the result
        callback(browser + ' ' + version);
    };

    // Function to get the operating system
    ext.getOS = function(callback) {
        var OSName = '';
        if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
        if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
        if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
        if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';

        // Callback the result
        callback(OSName);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Browser', 'getBrowser'],
            ['R', 'Operating System', 'getOS'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Browser and OS info', descriptor, ext);
})({});
