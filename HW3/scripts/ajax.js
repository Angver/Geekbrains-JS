window.onload(function () {
    var xmlhttp = new XMLHttpRequest();
    var countriesData = '/data/countries.json';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            insertCountries(myArr);
        }
    };

    xmlhttp.open("GET", countriesData, true);
    xmlhttp.send();

    function insertCountries(countries) {
        for (var i = 0; i < countries.length; i++) {

        }
    }
});