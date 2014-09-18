var requestId,

    /**
     * Gets the data from the audio module and requests a frame
     * to render it.
     */
    draw = function draw() {

        var data = V.audio.analyse();

        requestId = window.requestAnimationFrame(function () {

            V.visualizers.frequency.draw(data.frequencyDataArray);
            V.visualizers.face.drawOverlay(data);
            V.visualizers.summary.draw(data);
            draw();
        });
    },

    cancelAnimation = function () {
        window.cancelAnimationFrame(requestId);
    },

    initializeVisualizations = function () {

        V.visualizers.face.init('layer1', 'layer2');
        V.visualizers.summary.init('summary');
        V.visualizers.frequency.init('frequency');

        // when the audio plays then start drawing the visualizations
        V.audio.onPlay = draw;
    },

    renderID3Tags = function (tags) {

        V.views.metaData.render(tags, 'tags');
    },

    initializeFileSystem = function () {

        V.fileSystem.init('dropZone');
        V.fileSystem.onload = function (data) {

            initializeVisualizations();

            // there is data loaded from file, play it
            V.audio.load(data);

            // get ready for the face visualization
            V.visualizers.face.drawBackground();
        };

        V.fileSystem.onTagsFound = renderID3Tags;
    },

    clearVisualizations = function () {
        V.visualizers.face.clear();
        V.visualizers.summary.clear();
        V.visualizers.frequency.clear();
        document.getElementById('tags').innerHTML = '';
    },

    bindControls = function () {
        document.getElementById('stop').addEventListener('click', function () {
            cancelAnimation();
            clearVisualizations();
            V.audio.stop();
        });

        document.getElementById('volume').addEventListener('click', function () {
            V.audio.setGain(this.value);
        });
    };


bindControls();
initializeFileSystem();

V.audio.onended = cancelAnimation;
