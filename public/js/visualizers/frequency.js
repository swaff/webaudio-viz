V.visualizers.frequency = (function () {

    var frequency = {},
        canvas,

        getGradient = function (context) {

            // colors taken from http://flatuicolors.com
            var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(1,'#34495e');
            gradient.addColorStop(0.75,'#3498db');
            gradient.addColorStop(0.25,'#2980b9');
            gradient.addColorStop(0,'#e74c3c');
            return gradient;
        };

    frequency.init = function (canvasId) {
        canvas = document.getElementById(canvasId);
    };

    frequency.draw = function (frequencyData) {

        var context = canvas.getContext('2d'),
            width = canvas.width,
            height = canvas.height,
            dataLength = frequencyData.length,

            // the width of each bar is calculated from the number of points to plot
            barWidth = width / dataLength,
            i,
            total = 0;

        context.clearRect(0, 0, width, height);
        context.fillStyle = getGradient(context);

        for (i = 0; i < dataLength; i += 1) {

            var x = (i * barWidth) + 10,
                barHeight = frequencyData[i],
                y = height - barHeight;

            context.fillRect(x, y, barWidth, barHeight);
        }
    };

    return frequency;
}());
