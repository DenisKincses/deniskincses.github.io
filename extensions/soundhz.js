(function (ext) {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioContext.createAnalyser();
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var currentHz = 0;

    ext.getFrequency = function (callback) {
        if (!audioContext) return;

        analyser.fftSize = 2048;
        var buffer = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(buffer);

        var sum = 0;
        for (var i = 0; i < buffer.length; i++) {
            sum += (buffer[i] - 128) * (buffer[i] - 128);
        }
        var rms = Math.sqrt(sum / buffer.length);
        currentHz = Math.round(rms * 100);

        callback(currentHz);
    };

    ext._getStatus = function () {
        return {status: 2, msg: 'Ready'};
    };

    ext._stop = function () {
        if (!audioContext) return;
        audioContext.close();
    };

    ext._shutdown = function () {
        ext._stop();
    };

    ext._deviceRemoved = function (dev) {
        if (!audioContext) return;
        console.log('Device removed');
        if (dev === currentDevice) {
            ext._stop();
        }
    };

    var descriptor = {
        blocks: [
            ['R', 'get frequency', 'getFrequency']
        ],
        url: 'https://deniskincses.github.io/deniskincses/'
    };

    ScratchExtensions.register('Sound Frequency Extension', descriptor, ext);
})({});
