V.visualizers.canvasHelper = (function () {

    var helper = {};

    /*
     * Clears out the rectangle of the canvas passed.
     */
    helper.clear = function (canvas) {
        var width = canvas.width,
            height = canvas.height;

        canvas.getContext('2d').clearRect(0, 0, width, height);
    };

    /*
     * Gets a point object representing the centre of the
     * canvas rectangle.
     */
    helper.getCentrePoint = function (canvas) {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
    };

    return helper;
}());
