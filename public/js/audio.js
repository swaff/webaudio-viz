V.audio = (function () {

    var audio = {},
        audioContext,
        gainNode,
        analyser,
        source,

        init = function () {
            audioContext = new window.webkitAudioContext();
        };

    audio.play = function (buffer) {

        gainNode = audioContext.createGain();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        source = audioContext.createBufferSource();
        source.buffer = buffer;

        // create the pipeline
        source.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(audioContext.destination);

        source.start(0);
        source.onended = audio.onended;

        audio.onPlay();
    };

    audio.load = function (data) {
        audioContext.decodeAudioData(
            data.target.result,
            audio.play,
            function () {
                window.console.error('nope');
            }
        );
    };

    audio.stop = function () {
        source.stop();
    };

    audio.setGain = function (gain) {
        gainNode.gain.value = gain;
    };

    audio.onPlay = audio.onended = function () {
        window.console.log('override me');
    };

    audio.analyse = function () {

        var bufferLength,
            frequencyDataArray,
            timeDataArray,
            i = 0,
            total = 0,
            max = 0,
            timeDataLength,
            val;

        bufferLength = analyser.frequencyBinCount;

        frequencyDataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(frequencyDataArray);

        timeDataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(timeDataArray);

        timeDataLength = timeDataArray.length;

        while (i < timeDataLength) {
            val = timeDataArray[i];
            total += val;

            if (val > max) {
                max = val;
            }

            i += 1;
        }

        return {
            bufferLength: analyser.frequencyBinCount,
            frequencyDataArray: frequencyDataArray,
            timeData: {
                average: total / timeDataLength,
                max: max
            }
        };
    };

    init();

    return audio;

}());
