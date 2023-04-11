(function (ext) {
    const GENIUS_API_URL = 'https://api.genius.com';
    const GENIUS_ACCESS_TOKEN = '-1JLitwRR8-HT42zsHvmKzTmffpg1l1lAHpshw4_PhwSjjzXnPuSSDCEItKYhlum';

    ext.getLyrics = function (songTitle, callback) {
        const xhr = new XMLHttpRequest();
        const apiUrl = `${GENIUS_API_URL}/search?q=${encodeURIComponent(songTitle)}`;
        xhr.open('GET', apiUrl, true);
        xhr.setRequestHeader('Authorization', `Bearer ${GENIUS_ACCESS_TOKEN}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.meta.status === 200 && response.response.hits.length > 0) {
                    const songId = response.response.hits[0].result.id;
                    const songUrl = `${GENIUS_API_URL}/songs/${songId}`;
                    xhr.open('GET', songUrl, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            const songResponse = JSON.parse(xhr.responseText);
                            if (songResponse.meta.status === 200 && songResponse.response.song) {
                                const lyrics = songResponse.response.song.lyrics;
                                callback(lyrics);
                            } else {
                                callback(null);
                            }
                        }
                    };
                    xhr.send();
                } else {
                    callback(null);
                }
            }
        };
        xhr.send();
    };

    // Block and block menu descriptions
    const descriptor = {
        blocks: [
            ['r', 'Get lyrics of %s', 'getLyrics', 'song title'],
        ],
    };

    // Register the extension
    ScratchExtensions.register('Genius Lyrics', descriptor, ext);
})({});
