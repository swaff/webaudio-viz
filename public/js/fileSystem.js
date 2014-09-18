V.fileSystem = (function () {

    var fileSystem = {};

        stopPropagation = function (evt) {

            evt.stopPropagation();
            evt.preventDefault();
        },

        handleFileSelect = function (evt) {

            stopPropagation(evt);

            var reader = new FileReader(),
                file = evt.dataTransfer.files[0];

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

    fileSystem.onload = function () {};

    return fileSystem;
}());
