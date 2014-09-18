var requestId,

    /**
     * Gets the data from the audio module and requests a frame
     * to render it.
     */
    draw = function draw () {

        var data = V.audio.analyse();

        requestId = requestAnimationFrame(function () {

            V.visualizers.frequency.draw(data.frequencyDataArray);
            V.visualizers.face.drawOverlay(data);
            V.visualizers.summary.draw(data);
            draw();
        });
    },


    initializeVisualizations = function () {

        V.visualizers.face.init('layer1', 'layer2');
        V.visualizers.summary.init('summary');
        V.visualizers.frequency.init('frequency');

        // when the audion plays then start drawing the visualizations
        V.audio.onPlay = draw;
    },

    initializeFileSystem = function () {

        V.fileSystem.init('dropZone');
        V.fileSystem.onload = function (data) {

            // there is data loaded from file, play it
            V.audio.load(data);

            // get ready for the face visualization
            V.visualizers.face.drawBackground();
        } ;
    },

    bindControls = function () {
        document.getElementById('stop').addEventListener('click', function () {
            cancelAnimationFrame(requestId);
            V.audio.stop();
        });

        document.getElementById('volume').addEventListener('click', function () {
            V.audio.setGain(this.value);
        });
    };


bindControls();
initializeVisualizations();
initializeFileSystem();

V.audio.onended = function () {
    cancelAnimationFrame(requestId);
};
