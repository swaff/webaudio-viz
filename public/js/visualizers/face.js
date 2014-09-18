V.visualizers.face = (function () {

    var face = {},
        backgroundCanvas,
        foregroundCanvas,
        LINE_WIDTH = 8;

    face.init = function (backgroundId, foregroundId) {
        backgroundCanvas = document.getElementById(backgroundId);
        foregroundCanvas = document.getElementById(foregroundId);
    };

    face.drawBackground = function () {

        var context = backgroundCanvas.getContext('2d'),
            centerPoint = V.visualizers.canvasHelper.getCentrePoint(backgroundCanvas),
            radius = 100;

        // create a pink circle
        context.beginPath();
        context.arc(centerPoint.x, centerPoint.y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#ff2e80';
        context.fill();

        context.lineWidth = LINE_WIDTH;
        context.strokeStyle = '#fff';

        // draw the eyes
        context.moveTo(centerPoint.x - 30, centerPoint.y);
        context.lineTo(centerPoint.x - 30, centerPoint.y - 40);
        context.moveTo(centerPoint.x + 30, centerPoint.y);
        context.lineTo(centerPoint.x + 30, centerPoint.y - 40);
        context.stroke();
    };

    /**
     * Draws the face's mouth using two arcs that start from
     * 0.5 PI and extend out to form the mouth
     */
    face.drawOverlay = function (data) {

        var context = foregroundCanvas.getContext('2d'),
            centerPoint = V.visualizers.canvasHelper.getCentrePoint(foregroundCanvas),

            // fixed radius for the mouth
            radius = 60,

            // get the ratio for the average signal against the max signal
            ratio = data.timeData.average / data.timeData.max,
            halfRatio = ratio / 2,

            // calculate the two end points of the arc
            leftEndAngle  = (1.1 - halfRatio) * Math.PI,
            rightEndAngle = (halfRatio - 0.1) * Math.PI,
            startAngle = 0.5 * Math.PI;

        // clear out and existing line
        V.visualizers.canvasHelper.clear(foregroundCanvas);

        context.beginPath();
        context.lineWidth = LINE_WIDTH;
        context.strokeStyle = '#fff';

        // move to the mid point of the arc
        context.moveTo(centerPoint.x, centerPoint.y + radius);

        // draw the left hand side of the arc
        context.arc(centerPoint.x, centerPoint.y, radius, startAngle, leftEndAngle, false);

        // move to the mid point again
        context.moveTo(centerPoint.x, centerPoint.y + radius);

        // draw the right hand side of the arc
        context.arc(centerPoint.x, centerPoint.y, radius, startAngle, rightEndAngle, true);
        context.stroke();
    };

    face.clear = function () {
        V.visualizers.canvasHelper.clear(backgroundCanvas);
        V.visualizers.canvasHelper.clear(foregroundCanvas);
    };

    return face;
}());
