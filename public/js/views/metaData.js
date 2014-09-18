V.views.metaData = (function () {

    var meta = {},

        getSentanceCase = function (word) {
            return word[0].toUpperCase() + word.slice(1);
        },

        createDiv = function (tagsData, key) {

            var div, keySpan, valueSpan;

            if (!tagsData[key]) {

                // there is not any data for the key extracted from the id3
                // tags so break early.
                return false;
            }

            keySpan = document.createElement('span');
            keySpan.setAttribute('class', 'metaKey');
            keySpan.innerText = getSentanceCase(key) + ': ';

            valueSpan = document.createElement('span');
            valueSpan.innerText = tagsData[key];

            div = document.createElement('div');
            div.appendChild(keySpan);
            div.appendChild(valueSpan);

            return div;
        };

    meta.render = function (tagsData, targetId) {

        var target = document.getElementById(targetId);
        target.innerHTML = '';
        target.appendChild(createDiv(tagsData, 'artist'));
        target.appendChild(createDiv(tagsData, 'title'));
        target.appendChild(createDiv(tagsData, 'album'));
    };

    return meta;
}());
