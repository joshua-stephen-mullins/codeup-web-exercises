'use strict';

$(document).ready(function () {

    let currentWeather = {};
    let weatherForecast = {};


    mapboxgl.accessToken = MAPBOX_TOKEN;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 10,
        center: [-86.63486, 30.44811]
    });

    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: OPEN_WEATHER_APPID,
        q:     "San Antonio, US",
        units: "imperial"
    }).done(function(data) {
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
        $('#currentWindSpeed').html(Math.round(currentWeather.wind.speed));
        $('#currentWeatherIcon').html('<img src="http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png" id="currentWeatherIconImg">')





    });
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: OPEN_WEATHER_APPID,
        q:     "San Antonio, US",
        units: "imperial"
    }).done(function(data) {
        console.log('Forecasted Weather');
        console.log(data);
    });








});