ScratchExtensions.loadExternalJS("https://code.jquery.com/jquery-3.6.0.min.js");

(function() {
    var iframeExtension = {};
    iframeExtension.getInfo = function() {
        return {
            id: "iframe",
            name: "Embed Iframe",
            blocks: [
                {
                    opcode: "embedIframe",
                    blockType: "command",
                    text: "Embed Iframe with URL [url] Width [width] Height [height]",
                    arguments: {
                        url: {
                            type: "string",
                            defaultValue: "https://"
                        },
                        width: {
                            type: "number",
                            defaultValue: 400
                        },
                        height: {
                            type: "number",
                            defaultValue: 300
                        }
                    }
                }
            ]
        };
    };

    iframeExtension.embedIframe = function(args) {
        var url = args.url;
        var width = args.width;
        var height = args.height;
        var $iframe = $('<iframe>', {
            src: url,
            width: width,
            height: height
        });
        $('#stage').append($iframe);
    };

    ScratchExtensions.register("Embed Iframe", iframeExtension);
})();
