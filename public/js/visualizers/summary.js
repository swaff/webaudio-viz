V.visualizers.summary = (function () {

    var summary = {},
        summaryX = 0,
        canvas;

    summary.init = function (canvasId) {
        canvas = document.getElementById(canvasId);
    };

    summary.draw = function (data) {

        var context = canvas.getContext('2d'),
            height = canvas.height,
            width = canvas.width,
            ratio = (data.timeData.max - 128) / 128,
            lineHeight = ratio * height,

            // shift the y position up to create the reflection effect
            centre = height / 2;

        context.beginPath();
        context.lineWidth = 1;

        // shift the y position up to create the reflection effect
        context.moveTo(summaryX, centre - (lineHeight / 2));
        context.lineTo(summaryX, centre + (lineHeight / 2));
        context.strokeStyle = '#e67e22';
        context.stroke();

        summaryX += 1;

        // clear out the data if there is no space and start again
        if (summaryX > width) {
            summaryX = 0;
            summary.clear();
        }
    };

    summary.clear = function () {
        V.visualizers.canvasHelper.clear(canvas);
    };

    return summary;

}());
