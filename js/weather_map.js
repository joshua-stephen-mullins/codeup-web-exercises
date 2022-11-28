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
            console.log('Current Weather');
            console.log(data);
            currentWeather = data;
            $('#currentLocation').html(currentWeather.name);
            $('#currentTemp').html(Math.round(currentWeather.main.temp));
            $('#currentConditions').html(currentWeather.weather[0].description);
            $('#feelsLikeTemp').html(Math.round(currentWeather.main.feels_like));
            $('#currentLowTemp').html(Math.round(currentWeather.main.temp_min));
            $('#currentHighTemp').html(Math.round(currentWeather.main.temp_max));
            $('#currentHumidity').html(Math.round(currentWeather.main.humidity));
            $('#currentPressure').html(Math.round(currentWeather.main.pressure));
            $('#currentWindSpeed').html(Math.round(currentWeather.wind.speed));
            $('#currentWeatherIcon').html('<img src="http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png" id="currentWeatherIconImg" alt="Weather Icon">')
        });
    }

    function searchBox(searchTerm) {
        geocode(searchTerm, MAPBOX_TOKEN).then(function (result) {
            console.log(result);
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
            console.log('Forecasted Weather');
            console.log(data);
            weatherForecast = data;


            let timeBrackets = [];
            let dayTemps = [];
            for (let i = 0; i < 9; i++) {
                timeBrackets.push(weatherForecast.list[i].dt_txt);
                dayTemps.push(Math.round(weatherForecast.list[i].main.temp));
            }
            createChart("chart1", timeBrackets, dayTemps);
            timeBrackets = [];
            dayTemps = [];
            for (let i = 8; i < 17; i++) {
                timeBrackets.push(weatherForecast.list[i].dt_txt);
                dayTemps.push(Math.round(weatherForecast.list[i].main.temp));
            }
            $('#day1Header').html(timeBrackets[0])
            createChart("chart2", timeBrackets, dayTemps);
            timeBrackets = [];
            dayTemps = [];
            for (let i = 16; i < 25; i++) {
                timeBrackets.push(weatherForecast.list[i].dt_txt);
                dayTemps.push(Math.round(weatherForecast.list[i].main.temp));
            }
            createChart("chart3", timeBrackets, dayTemps);
            timeBrackets = [];
            dayTemps = [];
            console.log(weatherForecast)
            for (let i = 24; i < 33; i++) {
                timeBrackets.push(weatherForecast.list[i].dt_txt);
                dayTemps.push(Math.round(weatherForecast.list[i].main.temp));
            }
            createChart("chart4", timeBrackets, dayTemps);
            timeBrackets = [];
            dayTemps = [];
            for (let i = 32; i < 40; i++) {
                timeBrackets.push(weatherForecast.list[i].dt_txt);
                dayTemps.push(Math.round(weatherForecast.list[i].main.temp));
            }
            createChart("chart5", timeBrackets, dayTemps);
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
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            },
        });
    }
});