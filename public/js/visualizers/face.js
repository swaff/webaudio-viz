V.visualizers.face = (function () {

    var face = {},
        backgroundCanvas,
        foregroundCanvas;


    face.init = function (backgroundId, foregroundId) {
        backgroundCanvas = document.getElementById(backgroundId);
        foregroundCanvas = document.getElementById(foregroundId);
    };

    face.drawBackground = function () {

        context = backgroundCanvas.getContext('2d'),
        centerX = backgroundCanvas.width / 2,
        centerY = backgroundCanvas.height / 2,
        radius = 100;

        // create a pink circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#ff2e80';
        context.fill();

        context.lineWidth = 5;
        context.strokeStyle = '#fff';

        // draw the eyes
        context.moveTo(centerX - 30, centerY);
        context.lineTo(centerX - 30, centerY - 40);
        context.moveTo(centerX + 30, centerY);
        context.lineTo(centerX + 30, centerY - 40);
        context.stroke();
    };

    /**
     * Draws the face's mouth using two arcs that start from
     * 0.5 PI and extend out to form the mouth
     */
    face.drawOverlay = function (data) {

        var context = foregroundCanvas.getContext('2d'),
            width = foregroundCanvas.width,
            height = foregroundCanvas.height,

            // get the centre points
            x = width / 2,
            y = height / 2,

            // fixed radius for the mouth
            radius = 60,

            // get the ratio for the average signal against the max signal
            ratio = data.timeData.average / data.timeData.max,
            halfRatio = ratio / 2,

            // calculate the two end points
            leftEndAngle  = (1.1 - halfRatio) * Math.PI,
            rightEndAngle = (halfRatio - .1) * Math.PI,
            startAngle = .5 * Math.PI;

        // clear out and existing line
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(x, y + radius);
        context.arc(x, y, radius, startAngle, leftEndAngle, false);
        context.moveTo(x, y + radius);
        context.arc(x, y, radius, startAngle, rightEndAngle, true);
        context.lineWidth = 5;
        context.strokeStyle = '#fff';
        context.stroke();
};

    return face;
}());
