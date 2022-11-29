'use strict';

$(document).ready(function () {
    let currentWeather = {};
    let weatherForecast = {};

    mapboxgl.accessToken = MAPBOX_TOKEN;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 10,
    });

    function loadMapCurrent() {
        const lngLat = marker.getLngLat();
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            lat: lngLat.lat,
            lon: lngLat.lng,
            units: "imperial"
        }).done(function (data) {
            currentWeather = data;
            let currentWeatherDesc = currentWeather.weather[0].description;
            $('#currentLocation').html(currentWeather.name);
            $('#currentTemp').html(Math.round(currentWeather.main.temp));
            $('#currentConditions').html(capitalize(currentWeatherDesc));
            $('#feelsLikeTemp').html(Math.round(currentWeather.main.feels_like));
            $('#currentLowTemp').html(Math.round(currentWeather.main.temp_min));
            $('#currentHighTemp').html(Math.round(currentWeather.main.temp_max));
            $('#currentHumidity').html(Math.round(currentWeather.main.humidity));
            $('#currentPressure').html(Math.round(currentWeather.main.pressure));
            $('#currentWindSpeed').html(Math.round(currentWeather.wind.speed));
            $('#currentWeatherIcon').html('<img src="http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png" id="currentWeatherIconImg" alt="Weather Icon">')
        });
    }

    function capitalize(string){
    let arr = string.split(" ");
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
        return arr.join(" ")
    }

    function searchBox(searchTerm) {
        geocode(searchTerm, MAPBOX_TOKEN).then(function (result) {
            map.setCenter(result);
            map.setZoom(3);
            marker.setLngLat(result).addTo(map);
            loadMapCurrent();
            loadMapForecast();
        });
    }

    searchBox("Merritt Island");

    $('#searchBox').click(function (e) {
        e.preventDefault();
        searchBox($('#searchBoxInput').val())
    })


    let marker = new mapboxgl.Marker({
        draggable: true
    });

    function add_marker(event) {
        let coordinates = event.lngLat;
        console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
        marker.setLngLat(coordinates).addTo(map);
        loadMapCurrent();
        loadMapForecast()
    }

    map.on('click', add_marker);
    marker.on('dragend', loadMapCurrent);
    marker.on('dragend', loadMapForecast);


    function loadMapForecast() {
        const lngLat = marker.getLngLat();
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: OPEN_WEATHER_APPID,
            lat: lngLat.lat,
            lon: lngLat.lng,
            units: "imperial"
        }).done(function (data) {
            weatherForecast = data;
            console.log(weatherForecast)
            let chart1 = {}
            chart1.dateTime = [];
            chart1.temps = [];
            let chart2 = {}
            chart2.dateTime = [];
            chart2.temps = [];
            let chart3 = {}
            chart3.dateTime = [];
            chart3.temps = [];
            let chart4 = {}
            chart4.dateTime = [];
            chart4.temps = [];
            let chart5 = {}
            chart5.dateTime = [];
            chart5.temps = [];

            function addDays(date, days) {
                let result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }

            let currentTime = new Date(currentWeather.dt * 1000);
            let currentDate = currentTime.toLocaleDateString();

            weatherForecast.list.forEach(function (forecastData) {
                let forecastDataDate = new Date(forecastData.dt * 1000);
                let forecastDataDateOnly = forecastDataDate.toLocaleDateString();
                let forecastDataTime = forecastDataDate.toLocaleTimeString();
                if (currentDate === forecastDataDateOnly) {
                    chart1.dateTime.push(forecastDataTime);
                    chart1.temps.push(forecastData.main.temp)
                    $('#day1Header').html('Today')
                } else if (forecastDataDateOnly === (addDays(currentTime, 1).toLocaleDateString())) {
                    chart2.dateTime.push(forecastDataTime);
                    chart2.temps.push(forecastData.main.temp)
                    $('#day2Header').html(addDays(currentTime, 1).toLocaleDateString())
                    if (forecastDataTime === '12:00:00 AM') {
                        chart1.dateTime.push(forecastDataTime);
                        chart1.temps.push(forecastData.main.temp)
                    }
                } else if (forecastDataDateOnly === (addDays(currentTime, 2).toLocaleDateString())) {
                    chart3.dateTime.push(forecastDataTime);
                    chart3.temps.push(forecastData.main.temp)
                    $('#day3Header').html(addDays(currentTime, 2).toLocaleDateString())
                    if (forecastDataTime === '12:00:00 AM') {
                        chart2.dateTime.push(forecastDataTime);
                        chart2.temps.push(forecastData.main.temp)
                    }
                } else if (forecastDataDateOnly === (addDays(currentTime, 3).toLocaleDateString())) {
                    chart4.dateTime.push(forecastDataTime);
                    chart4.temps.push(forecastData.main.temp)
                    $('#day4Header').html(addDays(currentTime, 3).toLocaleDateString())
                    if (forecastDataTime === '12:00:00 AM') {
                        chart3.dateTime.push(forecastDataTime);
                        chart3.temps.push(forecastData.main.temp)
                    }
                } else if (forecastDataDateOnly === (addDays(currentTime, 4).toLocaleDateString())) {
                    chart5.dateTime.push(forecastDataTime);
                    chart5.temps.push(forecastData.main.temp)
                    $('#day5Header').html(addDays(currentTime, 4).toLocaleDateString())
                    if (forecastDataTime === '12:00:00 AM') {
                        chart4.dateTime.push(forecastDataTime);
                        chart4.temps.push(forecastData.main.temp)
                    }
                }
            })
            createChart("chart1", chart1.dateTime, chart1.temps);
            let chart1Sorted = chart1.temps.sort(function(a, b){return a - b});
            $('#day1Low').html(Math.round(chart1Sorted[0]));
            $('#day1High').html(Math.round(chart1Sorted.reverse()[0]));
            createChart("chart2", chart2.dateTime, chart2.temps);
            let chart2Sorted = chart2.temps.sort(function(a, b){return a - b});
            $('#day2Low').html(Math.round(chart2Sorted[0]));
            $('#day2High').html(Math.round(chart2Sorted.reverse()[0]));
            createChart("chart3", chart3.dateTime, chart3.temps);
            let chart3Sorted = chart3.temps.sort(function(a, b){return a - b});
            $('#day3Low').html(Math.round(chart3Sorted[0]));
            $('#day3High').html(Math.round(chart3Sorted.reverse()[0]));
            createChart("chart4", chart4.dateTime, chart4.temps);
            let chart4Sorted = chart4.temps.sort(function(a, b){return a - b});
            $('#day4Low').html(Math.round(chart4Sorted[0]));
            $('#day4High').html(Math.round(chart4Sorted.reverse()[0]));
            createChart("chart5", chart5.dateTime, chart5.temps);
            let chart5Sorted = chart5.temps.sort(function(a, b){return a - b});
            $('#day5Low').html(Math.round(chart5Sorted[0]));
            $('#day5High').html(Math.round(chart5Sorted.reverse()[0]));
        });
    }

    function createChart(divName, timeBrackets, dayTemps) {
        const ctx = document.getElementById(divName).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeBrackets,
                datasets: [{
                    label: 'Temperature',
                    backgroundColor: 'rgba(161, 198, 247, 1)',
                    borderColor: 'rgb(47, 128, 237)',
                    data: dayTemps,
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    yAxes: [{
                        // display: false,
                        ticks: {
                            beginAtZero: false,
                        }
                    }]
                }
            },
        });
    }
});