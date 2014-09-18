V.fileSystem = (function () {

    var fileSystem = {},

        stopPropagation = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        },


        loadTagsFromFile = function (file) {
            var url = file.urn ||file.name;

            ID3.loadTags(
                url,
                function() {

                    var tags = ID3.getAllTags(url);
                    fileSystem.onTagsFound(tags);
                },
                {
                    tags: ["artist", "title", "album"],
                    dataReader: FileAPIReader(file)
                }
            );
        },

        handleFileSelect = function (evt) {

            stopPropagation(evt);

            var reader = new FileReader(),
                file = evt.dataTransfer.files[0];

            loadTagsFromFile(file);

            reader.onload = fileSystem.onload;
            reader.readAsArrayBuffer(file);
        },

        handleDragOver = function (evt) {
            stopPropagation(evt);
            evt.dataTransfer.dropEffect = 'copy';
        };

    fileSystem.init = function (dropZoneId) {

        var dropZone = document.getElementById(dropZoneId);
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
    };

    /* onload event ready for overriding */
    fileSystem.onload = function () {
        window.console.log('override me');
    };

    fileSystem.onTagsFound = function (tags) {
        window.console.log('override me', tags);
    }

    return fileSystem;
}());












